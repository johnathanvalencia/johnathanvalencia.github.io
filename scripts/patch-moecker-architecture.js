#!/usr/bin/env node
/**
 * Enterprise consulting refinement pass for moecker-solution-architecture.html
 */
const fs = require('fs');
const path = require('path');

const HTML_PATH = path.join(__dirname, '../public/moecker-solution-architecture.html');

function bundleTemplateJson(t) {
  return JSON.stringify(t).replace(/<\//g, '<\\u002F');
}

function parseTemplate(html) {
  const openTag = '<script type="__bundler/template">';
  return JSON.parse(
    html.slice(html.indexOf(openTag) + openTag.length, html.lastIndexOf('</script>', html.lastIndexOf('</body>')))
  );
}

function writeBundled(html, template) {
  const loaderEnd = html.indexOf('<script type="__bundler/manifest">');
  const manifest = html.match(/<script type="__bundler\/manifest">[\s\S]*?<\/script>/)[0];
  const openTag = '<script type="__bundler/template">';
  return (
    html.slice(0, loaderEnd) +
    manifest +
    '\n  ' +
    openTag +
    bundleTemplateJson(template) +
    '</script>\n</body>\n</html>\n'
  );
}

// ─── CSS additions (pipeline + section hierarchy) ───
const EXTRA_CSS = `
  .pipe-connector{display:flex;flex-direction:column;align-items:center;padding:5px 0;}
  .pipe-connector .pipe-line{width:2px;height:12px;background:var(--hair2);}
  .sec-alt{background:var(--bg2);border-top:1px solid var(--hair);border-bottom:1px solid var(--hair);}
  .sec-hero-pad{padding:112px 32px;scroll-margin-top:80px;display:flex;justify-content:center;}
  .sec-pad{padding:104px 32px;scroll-margin-top:80px;display:flex;justify-content:center;}
  .workflow-desktop{display:flex;flex-direction:column;align-items:center;gap:18px;}
  .workflow-row{display:flex;align-items:stretch;flex-wrap:nowrap;justify-content:center;}
  .workflow-unit{display:flex;align-items:center;}
  .workflow-card{width:176px;min-height:172px;background:var(--card);border:1px solid var(--hair);border-radius:16px;padding:24px 18px;display:flex;flex-direction:column;gap:14px;}
  .workflow-arrow-h{font-size:26px;color:color-mix(in oklab,var(--accent),var(--ink3) 55%);margin:0 10px;flex-shrink:0;}
  .workflow-arrow-between{font-size:22px;color:color-mix(in oklab,var(--accent),var(--ink3) 55%);}
  .workflow-responsive{display:none;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;align-items:stretch;}
  .workflow-item{display:flex;flex-direction:column;align-items:center;min-width:0;}
  .workflow-responsive .workflow-card{width:100%;}
  .workflow-arrow-v{display:none;align-items:center;justify-content:center;padding:10px 0;color:color-mix(in oklab,var(--accent),var(--ink3) 55%);font-size:20px;}
  @media (max-width:959px){
    .workflow-desktop{display:none;}
    .workflow-responsive{display:grid;}
  }
  @media (max-width:720px){
    .workflow-responsive{grid-template-columns:repeat(2,minmax(0,1fr));}
  }
  @media (max-width:520px){
    .workflow-responsive{grid-template-columns:1fr;gap:0;max-width:320px;margin:0 auto;}
    .workflow-arrow-v{display:flex;}
  }
  .onprem-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
  @media (max-width:640px){
    .onprem-compare-grid{grid-template-columns:1fr;}
  }
`;

// ─── Hero trust badges ───
const HERO_STATS_OLD = `      <div style="display:flex;align-items:center;gap:36px;margin-top:42px;flex-wrap:wrap;justify-content:center;">
        <sc-for list="{{ heroStats }}" as="st" hint-placeholder-count="3">
          <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
            <span style="font-size:26px;font-weight:800;letter-spacing:-0.02em;">{{ st.value }}</span>
            <span style="font-size:12px;color:var(--ink3);">{{ st.label }}</span>
          </div>
        </sc-for>
      </div>`;

const HERO_GUARANTEES_HTML = `      <div style="display:flex;align-items:center;gap:12px;margin-top:42px;flex-wrap:wrap;justify-content:center;">
        <sc-for list="{{ heroGuarantees }}" as="g" hint-placeholder-count="3">
          <div style="display:inline-flex;align-items:center;gap:8px;padding:9px 18px;background:rgba(255,255,255,0.8);border:1px solid var(--hair);border-radius:100px;backdrop-filter:blur(4px);">
            <i class="ph ph-check-circle" style="font-size:15px;color:var(--accent-strong);flex-shrink:0;"></i>
            <span style="font-size:13px;font-weight:600;color:var(--ink);letter-spacing:-0.01em;">{{ g }}</span>
          </div>
        </sc-for>
      </div>`;

// ─── Architecture pipeline (replaces horizontal cards) ───
const ARCH_SECTION_OLD = `      <div style="position:relative;padding-left:4px;">
        <div style="position:absolute;left:26px;top:26px;bottom:26px;width:2px;background:linear-gradient(180deg,var(--accent-line),var(--hair));border-radius:2px;"></div>
        <sc-for list="{{ archLayers }}" as="a" hint-placeholder-count="11">
          <div class="rv" style="display:grid;grid-template-columns:54px 1fr;align-items:center;gap:0;margin-bottom:12px;">
            <div style="display:flex;justify-content:center;position:relative;z-index:1;">
              <span style="width:54px;height:54px;border-radius:15px;background:#fff;border:1px solid var(--hair);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px -8px rgba(23,24,27,0.2);">
                <i class="ph {{ a.icon }}" style="font-size:24px;color:var(--accent-strong);"></i>
              </span>
            </div>
            <div class="card-lift" style="margin-left:18px;background:var(--card);border:1px solid var(--hair);border-radius:16px;padding:18px 22px;display:flex;align-items:center;justify-content:space-between;gap:18px;">
              <div style="display:flex;align-items:baseline;gap:14px;min-width:0;">
                <span style="font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:500;color:var(--ink3);flex-shrink:0;">{{ a.num }}</span>
                <div style="display:flex;flex-direction:column;gap:3px;min-width:0;">
                  <h3 style="margin:0;font-size:16.5px;font-weight:700;letter-spacing:-0.015em;">{{ a.title }}</h3>
                  <p style="margin:0;font-size:13.5px;line-height:1.45;color:var(--ink2);">{{ a.desc }}</p>
                </div>
              </div>
              <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.06em;color:var(--accent-strong);text-transform:uppercase;background:var(--accent-tint);border:1px solid var(--accent-line);padding:4px 10px;border-radius:100px;white-space:nowrap;flex-shrink:0;">{{ a.zone }}</span>
            </div>
          </div>
        </sc-for>
      </div>`;

const ARCH_PIPELINE_HTML = `      <div class="rv" style="max-width:540px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;">
        <sc-for list="{{ archLayers }}" as="a" hint-placeholder-count="11">
          <div style="display:flex;flex-direction:column;align-items:center;">
            <div class="card-lift" style="width:100%;background:var(--card);border:1px solid var(--hair);border-radius:16px;padding:16px 20px;display:flex;align-items:center;gap:14px;">
              <div style="width:46px;height:46px;border-radius:13px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="ph {{ a.icon }}" style="font-size:23px;color:var(--accent-strong);"></i>
              </div>
              <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;">
                <h3 style="margin:0;font-size:15.5px;font-weight:700;letter-spacing:-0.015em;">{{ a.title }}</h3>
                <p style="margin:0;font-size:12.5px;line-height:1.4;color:var(--ink3);">{{ a.desc }}</p>
              </div>
              <span style="font-family:'IBM Plex Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.06em;color:var(--ink3);text-transform:uppercase;flex-shrink:0;">{{ a.zone }}</span>
            </div>
            <sc-if value="{{ a.connector }}">
              <div class="pipe-connector">
                <div class="pipe-line"></div>
                <i class="ph ph-caret-down" style="font-size:13px;color:var(--ink3);"></i>
              </div>
            </sc-if>
          </div>
        </sc-for>
      </div>`;

// ─── New sections ───
const RAG_SECTION = `
  <!-- ===================== HOW AI REASONS OVER EVIDENCE ===================== -->
  <section id="ai-reasoning" class="sec-alt sec-pad">
    <div style="width:100%;max-width:1160px;">
      <div class="rv" style="max-width:680px;margin-bottom:56px;">
        <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.1em;color:var(--accent-strong);text-transform:uppercase;">03 / AI Pipeline</span>
        <h2 style="margin:16px 0 0;font-size:42px;font-weight:800;letter-spacing:-0.03em;line-height:1.08;">How AI reasons over evidence</h2>
        <p style="margin:16px 0 0;font-size:16.5px;line-height:1.6;color:var(--ink2);">A retrieval augmented generation pipeline that keeps every step inside the firm's environment. No external model calls at any stage.</p>
      </div>
      <div class="rv" style="max-width:560px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;">
        <sc-for list="{{ ragPipeline }}" as="r" hint-placeholder-count="9">
          <div style="display:flex;flex-direction:column;align-items:center;">
            <div style="width:100%;background:var(--card);border:1px solid var(--hair);border-radius:16px;padding:18px 22px;display:flex;align-items:center;gap:14px;">
              <div style="width:44px;height:44px;border-radius:12px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="ph {{ r.icon }}" style="font-size:22px;color:var(--accent-strong);"></i>
              </div>
              <div style="flex:1;min-width:0;">
                <h3 style="margin:0;font-size:15px;font-weight:700;letter-spacing:-0.015em;">{{ r.title }}</h3>
                <p style="margin:4px 0 0;font-size:13px;line-height:1.45;color:var(--ink2);">{{ r.desc }}</p>
              </div>
            </div>
            <sc-if value="{{ r.connector }}">
              <div class="pipe-connector">
                <div class="pipe-line"></div>
                <i class="ph ph-caret-down" style="font-size:13px;color:var(--ink3);"></i>
              </div>
            </sc-if>
          </div>
        </sc-for>
      </div>
    </div>
  </section>

`;

const ONPREM_SECTION = `
  <!-- ===================== WHY ON-PREMISE AI ===================== -->
  <section id="why-onprem" class="sec-pad">
    <div style="width:100%;max-width:1160px;">
      <div class="rv" style="max-width:680px;margin-bottom:56px;">
        <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.1em;color:var(--accent-strong);text-transform:uppercase;">04 / Deployment Model</span>
        <h2 style="margin:16px 0 0;font-size:42px;font-weight:800;letter-spacing:-0.03em;line-height:1.08;">Why on-premise AI?</h2>
        <p style="margin:16px 0 0;font-size:16.5px;line-height:1.6;color:var(--ink2);">For forensic investigations, where evidence sensitivity and chain of custody are non-negotiable, deployment model is an architectural decision.</p>
      </div>
      <div class="rv onprem-compare-grid">
        <div class="cloud-ai-card" style="display:none;background:var(--card);border:1px solid var(--hair);border-radius:20px;padding:28px 26px;flex-direction:column;gap:20px;">
          <div style="display:flex;align-items:center;gap:11px;">
            <div style="width:40px;height:40px;border-radius:11px;background:color-mix(in oklab,var(--ink3),#fff 88%);display:flex;align-items:center;justify-content:center;">
              <i class="ph ph-cloud" style="font-size:20px;color:var(--ink3);"></i>
            </div>
            <h3 style="margin:0;font-size:18px;font-weight:700;letter-spacing:-0.015em;color:var(--ink2);">Cloud AI</h3>
          </div>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <sc-for list="{{ cloudCompare }}" as="c" hint-placeholder-count="4">
              <div style="display:flex;align-items:flex-start;gap:10px;">
                <i class="ph ph-x-circle" style="font-size:17px;color:var(--ink3);flex-shrink:0;margin-top:1px;"></i>
                <span style="font-size:14px;line-height:1.5;color:var(--ink2);">{{ c }}</span>
              </div>
            </sc-for>
          </div>
        </div>
        <div class="onprem-ai-card" style="width:100%;background:linear-gradient(180deg,#fff,var(--accent-tint));border:1px solid var(--accent-line);border-radius:20px;padding:28px 26px;display:flex;flex-direction:column;gap:20px;box-shadow:0 20px 50px -30px color-mix(in oklab,var(--accent),transparent 35%);">
          <div style="display:flex;align-items:center;gap:11px;">
            <div style="width:40px;height:40px;border-radius:11px;background:linear-gradient(155deg,var(--accent),var(--accent-strong));display:flex;align-items:center;justify-content:center;">
              <i class="ph ph-buildings" style="font-size:20px;color:#fff;"></i>
            </div>
            <h3 style="margin:0;font-size:18px;font-weight:700;letter-spacing:-0.015em;">On-Premise AI</h3>
          </div>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <sc-for list="{{ onPremCompare }}" as="c" hint-placeholder-count="4">
              <div style="display:flex;align-items:flex-start;gap:10px;">
                <i class="ph ph-check-circle" style="font-size:17px;color:var(--accent-strong);flex-shrink:0;margin-top:1px;"></i>
                <span style="font-size:14px;line-height:1.5;font-weight:500;color:var(--ink);">{{ c }}</span>
              </div>
            </sc-for>
          </div>
        </div>
      </div>
    </div>
  </section>

`;

const WORKFLOW_SECTION_OLD = `      <div class="rv" style="display:flex;flex-direction:column;align-items:center;gap:18px;">
        <div style="display:flex;align-items:stretch;flex-wrap:nowrap;justify-content:center;">
          <sc-for list="{{ workflowRow1 }}" as="s" hint-placeholder-count="4">
            <div style="display:flex;align-items:center;">
              <div class="card-lift" style="width:176px;min-height:172px;background:var(--card);border:1px solid var(--hair);border-radius:16px;padding:24px 18px;display:flex;flex-direction:column;gap:14px;">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <div style="width:38px;height:38px;border-radius:11px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;">
                    <i class="ph {{ s.icon }}" style="font-size:19px;color:var(--accent-strong);"></i>
                  </div>
                  <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--ink3);">{{ s.num }}</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:5px;">
                  <span style="font-size:13.5px;font-weight:700;letter-spacing:-0.01em;line-height:1.2;">{{ s.label }}</span>
                  <span style="font-size:11.5px;color:var(--ink3);line-height:1.35;">{{ s.sub }}</span>
                </div>
              </div>
              <sc-if value="{{ s.arrow }}">
                <i class="ph ph-arrow-right" style="font-size:26px;color:color-mix(in oklab,var(--accent),var(--ink3) 55%);margin:0 10px;flex-shrink:0;"></i>
              </sc-if>
            </div>
          </sc-for>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;padding:2px 0;">
          <i class="ph ph-arrow-down" style="font-size:22px;color:color-mix(in oklab,var(--accent),var(--ink3) 55%);"></i>
        </div>
        <div style="display:flex;align-items:stretch;flex-wrap:nowrap;justify-content:center;">
          <sc-for list="{{ workflowRow2 }}" as="s" hint-placeholder-count="3">
            <div style="display:flex;align-items:center;">
              <div class="card-lift" style="width:176px;min-height:172px;background:var(--card);border:1px solid var(--hair);border-radius:16px;padding:24px 18px;display:flex;flex-direction:column;gap:14px;">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <div style="width:38px;height:38px;border-radius:11px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;">
                    <i class="ph {{ s.icon }}" style="font-size:19px;color:var(--accent-strong);"></i>
                  </div>
                  <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--ink3);">{{ s.num }}</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:5px;">
                  <span style="font-size:13.5px;font-weight:700;letter-spacing:-0.01em;line-height:1.2;">{{ s.label }}</span>
                  <span style="font-size:11.5px;color:var(--ink3);line-height:1.35;">{{ s.sub }}</span>
                </div>
              </div>
              <sc-if value="{{ s.arrow }}">
                <i class="ph ph-arrow-right" style="font-size:26px;color:color-mix(in oklab,var(--accent),var(--ink3) 55%);margin:0 10px;flex-shrink:0;"></i>
              </sc-if>
            </div>
          </sc-for>
        </div>
      </div>`;

const WORKFLOW_CARD_HEAD = `                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <div style="width:38px;height:38px;border-radius:11px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;">
                    <i class="ph {{ s.icon }}" style="font-size:19px;color:var(--accent-strong);"></i>
                  </div>
                  <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--ink3);">{{ s.num }}</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:5px;">
                  <span style="font-size:13.5px;font-weight:700;letter-spacing:-0.01em;line-height:1.2;">{{ s.label }}</span>
                  <span style="font-size:11.5px;color:var(--ink3);line-height:1.35;">{{ s.sub }}</span>
                </div>`;

const WORKFLOW_SECTION_NEW = `      <div class="workflow-desktop rv">
        <div class="workflow-row">
          <sc-for list="{{ workflowRow1 }}" as="s" hint-placeholder-count="4">
            <div class="workflow-unit">
              <div class="workflow-card card-lift">
${WORKFLOW_CARD_HEAD}
              </div>
              <sc-if value="{{ s.arrow }}">
                <i class="ph ph-arrow-right workflow-arrow-h"></i>
              </sc-if>
            </div>
          </sc-for>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;padding:2px 0;">
          <i class="ph ph-arrow-down workflow-arrow-between"></i>
        </div>
        <div class="workflow-row">
          <sc-for list="{{ workflowRow2 }}" as="s" hint-placeholder-count="3">
            <div class="workflow-unit">
              <div class="workflow-card card-lift">
${WORKFLOW_CARD_HEAD}
              </div>
              <sc-if value="{{ s.arrow }}">
                <i class="ph ph-arrow-right workflow-arrow-h"></i>
              </sc-if>
            </div>
          </sc-for>
        </div>
      </div>
      <div class="workflow-responsive rv">
        <sc-for list="{{ workflow }}" as="s" hint-placeholder-count="7">
          <div class="workflow-item">
            <div class="workflow-card card-lift">
${WORKFLOW_CARD_HEAD}
            </div>
            <sc-if value="{{ s.arrow }}">
              <div class="workflow-arrow-v" aria-hidden="true">
                <i class="ph ph-arrow-down"></i>
              </div>
            </sc-if>
          </div>
        </sc-for>
      </div>`;

// ─── Software stack cards ───
const SOFTWARE_TABLE_OLD = `      <div class="rv" style="background:var(--card);border:1px solid var(--hair);border-radius:20px;overflow:hidden;">
        <div style="display:grid;grid-template-columns:minmax(148px,0.95fr) minmax(200px,1.15fr) 2fr;gap:16px;padding:18px 24px;border-bottom:1px solid var(--hair);background:var(--bg2);">
          <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.08em;color:var(--ink3);text-transform:uppercase;">Layer</span>
          <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.08em;color:var(--ink3);text-transform:uppercase;">Recommendation</span>
          <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.08em;color:var(--ink3);text-transform:uppercase;">Purpose</span>
        </div>
        <sc-for list="{{ softwareStack }}" as="s" hint-placeholder-count="14">
          <div style="display:grid;grid-template-columns:minmax(148px,0.95fr) minmax(200px,1.15fr) 2fr;gap:16px;padding:18px 24px;border-bottom:1px solid var(--hair);align-items:start;">
            <span style="font-size:13.5px;font-weight:600;color:var(--ink);letter-spacing:-0.01em;">{{ s.layer }}</span>
            <span style="font-size:13.5px;font-weight:500;color:var(--accent-strong);letter-spacing:-0.01em;">{{ s.recommendation }}</span>
            <span style="font-size:13.5px;line-height:1.5;color:var(--ink2);">{{ s.purpose }}</span>
          </div>
        </sc-for>
      </div>`;

const SOFTWARE_CARDS_HTML = `      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(272px,1fr));gap:18px;">
        <sc-for list="{{ softwareStack }}" as="s" hint-placeholder-count="12">
          <div class="rv card-lift" style="background:var(--card);border:1px solid var(--hair);border-radius:18px;padding:24px 22px;display:flex;flex-direction:column;gap:14px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="width:40px;height:40px;border-radius:11px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="ph {{ s.icon }}" style="font-size:20px;color:var(--accent-strong);"></i>
              </div>
              <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.08em;color:var(--ink3);text-transform:uppercase;">{{ s.layer }}</span>
            </div>
            <h3 style="margin:0;font-size:17px;font-weight:700;letter-spacing:-0.015em;color:var(--ink);">{{ s.recommendation }}</h3>
            <p style="margin:0;font-size:13.5px;line-height:1.55;color:var(--ink2);">{{ s.purpose }}</p>
          </div>
        </sc-for>
      </div>`;

// ─── renderVals replacement ───
const RENDER_VALS_NEW = `  renderVals() {
    const heroNodes = [
      { icon: 'ph-browser', label: 'Web App', sub: 'Private investigator workspace' },
      { icon: 'ph-cpu', label: 'AI Engine', sub: 'Local models & inference' },
      { icon: 'ph-database', label: 'Evidence', sub: 'Secure on premise storage' },
    ];
    const heroGuarantees = [
      'Fully On Premise',
      'Zero External AI Calls',
      'Evidence Never Leaves Firm Network',
    ];

    const whyCards = [
      { icon: 'ph-shield-check', title: 'Security', desc: "Every piece of evidence, model, and inference stays inside the firm's environment. Nothing leaves the network." },
      { icon: 'ph-quotes', title: 'Grounded AI Responses', desc: 'AI answers are generated only from retrieved evidence, with a citation for every claim made.' },
      { icon: 'ph-lightning', title: 'Performance', desc: 'Optimized for local AI inference and the real demands of investigative workflows.' },
      { icon: 'ph-arrows-clockwise', title: 'Modular Design', desc: 'The platform is composed of independent components, allowing models, services, and workflows to be upgraded over time without redesigning the overall system.' },
    ];

    const archRaw = [
      { icon: 'ph-users-three', title: 'Investigators', zone: 'Access', desc: 'Analysts and case teams working entirely inside the organization.' },
      { icon: 'ph-browser', title: 'Internal Web Application', zone: 'Access', desc: 'A private, browser based workspace with no public internet exposure.' },
      { icon: 'ph-lock-key', title: 'Authentication & Permissions', zone: 'Application', desc: 'Identity, roles, and access scoped to each case and each user.' },
      { icon: 'ph-folders', title: 'Case Management', zone: 'Application', desc: 'Structured cases, custody, and workflow state in a single system.' },
      { icon: 'ph-database', title: 'Evidence Repository', zone: 'Data', desc: 'Secure, versioned storage for every document and artifact.' },
      { icon: 'ph-file-magnifying-glass', title: 'Document Intelligence', zone: 'Data', desc: 'OCR, email parsing, PST/OST processing, metadata extraction, and evidence preparation.' },
      { icon: 'ph-graph', title: 'Local Embedding Model', zone: 'AI Engine', desc: 'Converts evidence into vectors on local hardware without external calls.' },
      { icon: 'ph-circles-three', title: 'Vector Database', zone: 'AI Engine', desc: 'Fast semantic retrieval across millions of evidence passages.' },
      { icon: 'ph-cpu', title: 'Private AI Engine', zone: 'AI Engine', desc: 'A private language model reasons over the retrieved evidence.' },
      { icon: 'ph-seal-check', title: 'Grounded Responses', zone: 'Output', desc: 'Every answer is grounded in sources and returned with citations.' },
      { icon: 'ph-file-text', title: 'Court Ready Reports', zone: 'Output', desc: 'Findings compiled into professional, defensible deliverables.' },
    ];
    const archLayers = archRaw.map((a, i) => ({
      ...a,
      num: String(i + 1).padStart(2, '0'),
      connector: i < archRaw.length - 1,
    }));

    const ragRaw = [
      { icon: 'ph-database', title: 'Evidence', desc: 'Raw documents, emails, and artifacts from the active case.' },
      { icon: 'ph-scan', title: 'OCR & Parsing', desc: 'Text extraction from scans, PDFs, images, and email archives.' },
      { icon: 'ph-squares-four', title: 'Chunking', desc: 'Evidence split into searchable segments with preserved context.' },
      { icon: 'ph-graph', title: 'Embeddings', desc: 'Each chunk converted to a vector representation on local hardware.' },
      { icon: 'ph-circles-three', title: 'Vector Database', desc: 'Vectors indexed for fast semantic similarity search.' },
      { icon: 'ph-magnifying-glass', title: 'Semantic Retrieval', desc: 'The most relevant evidence passages retrieved for each question.' },
      { icon: 'ph-chat-text', title: 'Prompt Assembly', desc: 'Retrieved evidence combined with the investigator query.' },
      { icon: 'ph-cpu', title: 'Private LLM', desc: 'A local language model reasons only over the provided evidence.' },
      { icon: 'ph-seal-check', title: 'Evidence-Backed Answer', desc: 'Response returned with citations to source documents.' },
    ];
    const ragPipeline = ragRaw.map((r, i) => ({ ...r, connector: i < ragRaw.length - 1 }));

    const cloudCompare = [
      'Data leaves the organization',
      'Internet dependency for every query',
      'Ongoing API costs scale with usage',
      'Compliance and custody concerns',
    ];
    const onPremCompare = [
      'Evidence remains entirely internal',
      'Predictable infrastructure costs',
      'Greater regulatory compliance',
      'Complete organizational control',
    ];

    const infra = [
      { icon: 'ph-database', name: 'SQL Server', purpose: 'System of record for cases, users, and metadata.', why: 'Reliable, transactional storage the platform depends on.', value: 'A trusted single source of truth for every investigation.' },
      { icon: 'ph-archive', name: 'MinIO / Object Storage', purpose: 'Stores raw evidence files, generated reports, emails, PST/OST files, images, audio, and archived case materials inside the firm\\'s environment.', why: 'Handles large document volumes cost effectively on internal infrastructure.', value: 'Scales with case volume while keeping evidence under internal control.' },
      { icon: 'ph-circles-three', name: 'Qdrant', purpose: 'Vector database powering semantic search.', why: 'Retrieves the most relevant evidence in milliseconds.', value: 'Investigators find what matters, faster.' },
      { icon: 'ph-lightning', name: 'vLLM', purpose: 'High throughput serving layer for the language model.', why: 'Maximizes GPU efficiency for local inference.', value: 'Responsive AI with no cloud dependency.' },
      { icon: 'ph-brain', name: 'Local LLM', purpose: 'The reasoning engine, running entirely on premise.', why: 'Keeps sensitive analysis inside the firm\\'s environment.', value: 'AI capability with full data control.' },
      { icon: 'ph-cpu', name: 'GPU Server', purpose: 'Dedicated hardware for embedding and inference.', why: 'AI workloads require accelerated compute.', value: 'Predictable performance under real caseloads.' },
      { icon: 'ph-pulse', name: 'Monitoring', purpose: 'Observability across services and hardware.', why: 'Surfaces issues before they affect investigations.', value: 'Confidence that the platform stays available.' },
      { icon: 'ph-clock-counter-clockwise', name: 'Backups', purpose: 'Protected, recoverable copies of all data.', why: 'Evidence integrity and continuity are essential.', value: 'Resilience against loss or failure.' },
    ];

    const wfRaw = [
      { icon: 'ph-upload-simple', label: 'Upload Evidence', sub: 'Documents ingested securely' },
      { icon: 'ph-scan', label: 'OCR & Extraction', sub: 'Text pulled from any file' },
      { icon: 'ph-graph', label: 'Index & Embeddings', sub: 'Evidence made searchable' },
      { icon: 'ph-magnifying-glass', label: 'Semantic Search', sub: 'Find meaning, not keywords' },
      { icon: 'ph-sparkle', label: 'AI Investigation Workspace', sub: 'Ask questions of the evidence' },
      { icon: 'ph-seal-check', label: 'Evidence-Backed Findings', sub: 'Answers with citations' },
      { icon: 'ph-file-text', label: 'Professional Reports', sub: 'Court ready output' },
    ];
    const workflow = wfRaw.map((s, i) => ({
      ...s,
      num: String(i + 1).padStart(2, '0'),
      arrow: i < wfRaw.length - 1,
    }));
    const workflowRow1 = workflow.slice(0, 4).map((s, i) => ({
      ...s,
      arrow: i < 3,
    }));
    const workflowRow2 = workflow.slice(4).map((s, i) => ({
      ...s,
      arrow: i < 2,
    }));

    const security = [
      { icon: 'ph-shield-check', title: 'Internal Only', desc: "The entire platform runs inside the firm's network, with no public exposure.", featured: true },
      { icon: 'ph-cloud-slash', title: 'Zero External AI Calls', desc: 'Models run locally. No evidence is ever sent to a third party.', featured: true },
      { icon: 'ph-list-checks', title: 'Audit Logging', desc: 'Every action recorded for accountability and chain of custody.', featured: true },
      { icon: 'ph-lock-key', title: 'Role Based Access', desc: 'Permissions scoped to roles, cases, and individual users.', featured: false },
      { icon: 'ph-key', title: 'Encryption', desc: 'Data encrypted at rest and in transit throughout the system.', featured: false },
    ];

    const hwInitial = [
      { icon: 'ph-desktop-tower', k: 'Server', v: '1 GPU server or workstation class server' },
      { icon: 'ph-cpu', k: 'GPU', v: 'NVIDIA GPU, 48GB to 80GB+ VRAM preferred' },
      { icon: 'ph-hard-drives', k: 'Storage', v: 'Sufficient local storage for sample evidence' },
      { icon: 'ph-target', k: 'Goal', v: 'Validate accuracy, performance, and fit before production sizing' },
    ];
    const hwProd = [
      { icon: 'ph-cpu', k: 'GPU', v: 'Final production GPU configuration to be determined after validation' },
      { icon: 'ph-microchip', k: 'CPU', v: 'Representative starting point, to be finalized after validation' },
      { icon: 'ph-memory', k: 'Memory', v: 'Representative starting point, to be finalized after validation' },
      { icon: 'ph-hard-drives', k: 'Storage', v: 'Redundant NVMe + object tier (indicative)' },
      { icon: 'ph-users-three', k: 'Goal', v: 'Sustained load for multiple concurrent investigators' },
    ];

    const phaseRaw = [
      { icon: 'ph-seal-check', title: 'Architecture Approval', desc: 'Confirm the proposed design aligns with requirements.', duration: '1–2 days', status: 'In progress', current: true },
      { icon: 'ph-blueprint', title: 'Technical Design', desc: 'Detailed architecture, deployment topology, and security.', duration: '1 week', status: 'Planned', current: false },
      { icon: 'ph-flask', title: 'Prototype', desc: 'Working proof of concept on validation hardware.', duration: '2 weeks', status: 'Planned', current: false },
      { icon: 'ph-check-square', title: 'Validation', desc: 'Test accuracy, performance, and security with real evidence.', duration: '1 week', status: 'Planned', current: false },
      { icon: 'ph-code', title: 'Development', desc: 'Full platform build and integration.', duration: '6–8 weeks', status: 'Planned', current: false },
    ];
    const phases = phaseRaw.map(p => ({
      ...p,
      dotCss: p.current
        ? 'background:linear-gradient(155deg,var(--accent),var(--accent-strong));animation:pulseDot 2.4s ease-out infinite;'
        : 'background:#fff;border:1px solid var(--hair2);',
      iconCss: p.current ? 'color:#fff;' : 'color:var(--ink3);',
      titleCss: p.current ? 'color:var(--ink);' : 'color:var(--ink2);',
      statusCss: p.current ? 'color:var(--accent-strong);' : 'color:var(--ink3);',
      durationCss: p.current ? 'color:var(--accent-strong);font-weight:600;' : 'color:var(--ink3);',
    }));

    const softwareStack = [
      { icon: 'ph-browser', layer: 'Frontend', recommendation: 'Next.js', purpose: 'Private investigator workspace and administration interface.' },
      { icon: 'ph-brackets-curly', layer: 'Backend', recommendation: 'Node.js / TypeScript', purpose: 'Application logic, case workflows, permissions, and integrations.' },
      { icon: 'ph-circles-three', layer: 'Vector Search', recommendation: 'Qdrant', purpose: 'Semantic retrieval across indexed evidence.' },
      { icon: 'ph-lightning', layer: 'Inference', recommendation: 'vLLM', purpose: 'Private model serving inside the firm\\'s environment.' },
      { icon: 'ph-database', layer: 'Database', recommendation: 'SQL Server', purpose: 'System of record for cases, users, metadata, and audit logs.' },
      { icon: 'ph-archive', layer: 'Storage', recommendation: 'MinIO', purpose: 'Evidence repository for documents, emails, and archives.' },
      { icon: 'ph-brain', layer: 'Candidate Models', recommendation: 'Llama / Qwen / Mistral', purpose: 'Model selection finalized during validation with representative evidence.' },
      { icon: 'ph-graph', layer: 'Embeddings', recommendation: 'Local embedding model', purpose: 'Converts evidence into searchable vectors without external calls.' },
      { icon: 'ph-scan', layer: 'OCR', recommendation: 'Tesseract / PaddleOCR', purpose: 'Extracts text from scanned documents and images.' },
      { icon: 'ph-envelope', layer: 'Email Processing', recommendation: 'Local email parsing pipeline', purpose: 'Extracts messages, attachments, metadata, and threads.' },
      { icon: 'ph-lock-key', layer: 'Authentication', recommendation: 'LDAP / Active Directory', purpose: 'Uses existing firm identity and access controls.' },
      { icon: 'ph-pulse', layer: 'Monitoring', recommendation: 'Prometheus / Grafana', purpose: 'Tracks application health, GPU usage, and system performance.' },
    ];

    const nextSteps = [
      { num: '01', title: 'Review Proposed Architecture' },
      { num: '02', title: 'Gather IT Feedback' },
      { num: '03', title: 'Finalize Technical Architecture' },
      { num: '04', title: 'Validate Hardware & Models' },
      { num: '05', title: 'Begin Development' },
    ];

    const recBullets = [
      "Evidence remains entirely within the firm's infrastructure.",
      'AI responses are grounded in retrieved evidence with citations.',
      'A modular architecture supports future model upgrades and evolving investigative workflows.',
    ];

    return {
      heroNodes, heroGuarantees, whyCards, archLayers, ragPipeline,
      cloudCompare, onPremCompare,
      infra, softwareStack, workflow, workflowRow1, workflowRow2, security, hwInitial, hwProd, phases, recBullets, nextSteps,
    };
  }`;

function main() {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  let t = parseTemplate(html);

  // CSS
  t = t.replace('@keyframes pulseDot{', EXTRA_CSS + '\n  @keyframes pulseDot{');

  // Hero
  t = t.replace(HERO_STATS_OLD, HERO_GUARANTEES_HTML);

  // Principles spacing + icons
  t = t.replace(
    'grid-template-columns:repeat(auto-fit,minmax(248px,1fr));gap:18px;',
    'grid-template-columns:repeat(auto-fit,minmax(248px,1fr));gap:24px;'
  );
  t = t.replaceAll(
    'border-radius:18px;padding:24px 22px;display:flex;flex-direction:column;gap:16px;">\n            <div style="width:42px;height:42px;border-radius:12px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;">\n              <i class="ph {{ w.icon }}" style="font-size:21px;color:var(--accent-strong);"></i>',
    'border-radius:18px;padding:28px 26px;display:flex;flex-direction:column;gap:18px;">\n            <div style="width:48px;height:48px;border-radius:13px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;">\n              <i class="ph {{ w.icon }}" style="font-size:24px;color:var(--accent-strong);"></i>'
  );

  // Architecture pipeline
  t = t.replace(ARCH_SECTION_OLD, ARCH_PIPELINE_HTML);
  t = t.replace(
    '<section id="architecture" style="padding:104px 32px;scroll-margin-top:80px;display:flex;justify-content:center;">',
    '<section id="architecture" class="sec-hero-pad">'
  );

  // Insert new sections after architecture
  const archEnd = '  </section>\n\n  <!-- ===================== INFRASTRUCTURE COMPONENTS ===================== -->';
  t = t.replace(
    archEnd,
    '  </section>\n' + RAG_SECTION + ONPREM_SECTION + '\n  <!-- ===================== INFRASTRUCTURE COMPONENTS ===================== -->'
  );

  // Renumber section labels
  t = t.replace('03 / Components', '05 / Components');
  t = t.replace('04 / Software Stack', '06 / Software Stack');
  t = t.replace('05 / Workflow', '07 / Workflow');
  t = t.replace('06 / Security', '08 / Security');
  t = t.replace('07 / Hardware', '09 / Hardware');
  t = t.replace('08 / Roadmap', '10 / Roadmap');
  t = t.replace('09 / Next Steps', '12 / Next Steps');

  // Infrastructure section updates
  t = t.replace(
    '<section id="infrastructure" style="padding:104px 32px;scroll-margin-top:80px;display:flex;justify-content:center;background:var(--bg2);border-top:1px solid var(--hair);border-bottom:1px solid var(--hair);">',
    '<section id="infrastructure" class="sec-alt sec-pad">'
  );
  t = t.replace(
    /(<section id="infrastructure"[\s\S]*?grid-template-columns:repeat\(auto-fit,minmax\(268px,1fr\)\);gap:)16px/,
    '$120px'
  );
  // Infra card layout - business value first, larger icons
  const infraCardOld = `<div class="rv card-lift" style="background:var(--card);border:1px solid var(--hair);border-radius:18px;padding:24px 22px;display:flex;flex-direction:column;gap:18px;">
            <div style="display:flex;align-items:center;gap:13px;">
              <div style="width:42px;height:42px;border-radius:12px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="ph {{ c.icon }}" style="font-size:21px;color:var(--accent-strong);"></i>
              </div>
              <h3 style="margin:0;font-size:17px;font-weight:700;letter-spacing:-0.015em;">{{ c.name }}</h3>
            </div>
            <div style="display:flex;flex-direction:column;gap:13px;">
              <div style="display:flex;flex-direction:column;gap:3px;">
                <span style="font-family:'IBM Plex Mono',monospace;font-size:9.5px;font-weight:500;letter-spacing:0.08em;color:var(--ink3);text-transform:uppercase;">Purpose</span>
                <span style="font-size:13px;line-height:1.5;color:var(--ink);">{{ c.purpose }}</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:3px;">
                <span style="font-family:'IBM Plex Mono',monospace;font-size:9.5px;font-weight:500;letter-spacing:0.08em;color:var(--ink3);text-transform:uppercase;">Why it exists</span>
                <span style="font-size:13px;line-height:1.5;color:var(--ink2);">{{ c.why }}</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:5px;padding-top:12px;border-top:1px solid var(--hair);">
                <span style="font-family:'IBM Plex Mono',monospace;font-size:9.5px;font-weight:500;letter-spacing:0.08em;color:var(--accent-strong);text-transform:uppercase;">Business value</span>
                <span style="font-size:13px;line-height:1.5;font-weight:500;color:var(--ink);">{{ c.value }}</span>
              </div>
            </div>
          </div>`;
  const infraCardNew = `<div class="rv card-lift" style="background:var(--card);border:1px solid var(--hair);border-radius:18px;padding:28px 24px;display:flex;flex-direction:column;gap:20px;">
            <div style="display:flex;align-items:center;gap:14px;">
              <div style="width:48px;height:48px;border-radius:13px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="ph {{ c.icon }}" style="font-size:24px;color:var(--accent-strong);"></i>
              </div>
              <h3 style="margin:0;font-size:17px;font-weight:700;letter-spacing:-0.015em;">{{ c.name }}</h3>
            </div>
            <div style="padding:14px 16px;background:var(--accent-tint);border:1px solid var(--accent-line);border-radius:12px;">
              <span style="font-family:'IBM Plex Mono',monospace;font-size:9.5px;font-weight:500;letter-spacing:0.08em;color:var(--accent-strong);text-transform:uppercase;">Business Value</span>
              <p style="margin:6px 0 0;font-size:14.5px;line-height:1.5;font-weight:600;color:var(--ink);">{{ c.value }}</p>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div style="display:flex;flex-direction:column;gap:3px;">
                <span style="font-family:'IBM Plex Mono',monospace;font-size:9.5px;font-weight:500;letter-spacing:0.08em;color:var(--ink3);text-transform:uppercase;">Purpose</span>
                <span style="font-size:13px;line-height:1.5;color:var(--ink2);">{{ c.purpose }}</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:3px;">
                <span style="font-family:'IBM Plex Mono',monospace;font-size:9.5px;font-weight:500;letter-spacing:0.08em;color:var(--ink3);text-transform:uppercase;">Why it exists</span>
                <span style="font-size:13px;line-height:1.5;color:var(--ink3);">{{ c.why }}</span>
              </div>
            </div>
          </div>`;
  t = t.replace(infraCardOld, infraCardNew);

  // Software stack
  t = t.replace(
    '<section id="software" style="padding:104px 32px;scroll-margin-top:80px;display:flex;justify-content:center;">',
    '<section id="software" class="sec-pad">'
  );
  t = t.replace(SOFTWARE_TABLE_OLD, SOFTWARE_CARDS_HTML);

  // Workflow
  t = t.replace(
    '<section id="workflow" style="padding:104px 32px;scroll-margin-top:80px;display:flex;justify-content:center;">',
    '<section id="workflow" class="sec-alt sec-pad">'
  );
  const wfCardOld = `width:158px;min-height:150px;background:var(--card);border:1px solid var(--hair);border-radius:16px;padding:20px 16px;display:flex;flex-direction:column;gap:12px;`;
  const wfCardNew = `width:176px;min-height:172px;background:var(--card);border:1px solid var(--hair);border-radius:16px;padding:24px 18px;display:flex;flex-direction:column;gap:14px;`;
  t = t.replace(wfCardOld, wfCardNew);
  t = t.replace(
    `<i class="ph ph-caret-right" style="font-size:16px;color:var(--ink3);margin:0 6px;flex-shrink:0;"></i>`,
    `<i class="ph ph-arrow-right" style="font-size:20px;color:color-mix(in oklab,var(--accent),var(--ink3) 55%);margin:0 10px;flex-shrink:0;"></i>`
  );
  t = t.replace(WORKFLOW_SECTION_OLD, WORKFLOW_SECTION_NEW);

  // Security featured cards
  const secCardOld = `<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:18px;padding:24px 22px;display:flex;flex-direction:column;gap:16px;transition:background .3s ease,border-color .3s ease;" style-hover="background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.16);">
            <div style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;">
              <i class="ph {{ sec.icon }}" style="font-size:22px;color:color-mix(in oklab,var(--accent),#fff 45%);"></i>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <h3 style="margin:0;font-size:16px;font-weight:700;letter-spacing:-0.015em;color:#fff;">{{ sec.title }}</h3>
              <p style="margin:0;font-size:13px;line-height:1.5;color:#A9ADB5;">{{ sec.desc }}</p>
            </div>
          </div>`;
  const secCardNew = `<sc-if value="{{ sec.featured }}">
            <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);border-radius:18px;padding:28px 24px;display:flex;flex-direction:column;gap:18px;transition:background .3s ease,border-color .3s ease;" style-hover="background:rgba(255,255,255,0.11);border-color:rgba(255,255,255,0.24);">
              <div style="width:50px;height:50px;border-radius:13px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;">
                <i class="ph {{ sec.icon }}" style="font-size:26px;color:color-mix(in oklab,var(--accent),#fff 40%);"></i>
              </div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                <h3 style="margin:0;font-size:17px;font-weight:700;letter-spacing:-0.015em;color:#fff;">{{ sec.title }}</h3>
                <p style="margin:0;font-size:13.5px;line-height:1.55;color:#C4C8CE;">{{ sec.desc }}</p>
              </div>
            </div>
          </sc-if>
          <sc-if value="{{ !sec.featured }}">
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:18px;padding:24px 22px;display:flex;flex-direction:column;gap:16px;transition:background .3s ease,border-color .3s ease;" style-hover="background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.16);">
              <div style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;">
                <i class="ph {{ sec.icon }}" style="font-size:22px;color:color-mix(in oklab,var(--accent),#fff 45%);"></i>
              </div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                <h3 style="margin:0;font-size:16px;font-weight:700;letter-spacing:-0.015em;color:#fff;">{{ sec.title }}</h3>
                <p style="margin:0;font-size:13px;line-height:1.5;color:#A9ADB5;">{{ sec.desc }}</p>
              </div>
            </div>
          </sc-if>`;
  t = t.replace(secCardOld, secCardNew);
  t = t.replace(
    'grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px;',
    'grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:18px;'
  );

  // Hardware visual cards
  const hwRowOld = `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:1px solid var(--hair);">
                <span style="font-size:13px;color:var(--ink2);">{{ h.k }}</span>
                <span style="font-family:'IBM Plex Mono',monospace;font-size:12.5px;font-weight:500;color:var(--ink);text-align:right;">{{ h.v }}</span>
              </div>`;
  const hwRowNew = `<div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:var(--bg2);border-radius:12px;border:1px solid var(--hair);">
                <div style="width:38px;height:38px;border-radius:10px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <i class="ph {{ h.icon }}" style="font-size:19px;color:var(--accent-strong);"></i>
                </div>
                <div style="display:flex;flex-direction:column;gap:3px;min-width:0;">
                  <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.06em;color:var(--ink3);text-transform:uppercase;">{{ h.k }}</span>
                  <span style="font-size:13px;line-height:1.45;font-weight:500;color:var(--ink);">{{ h.v }}</span>
                </div>
              </div>`;
  t = t.replaceAll(hwRowOld, hwRowNew);
  t = t.replace(
    `<div style="display:flex;flex-direction:column;">
            <sc-for list="{{ hwInitial }}" as="h" hint-placeholder-count="5">`,
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
            <sc-for list="{{ hwInitial }}" as="h" hint-placeholder-count="5">`
  );
  t = t.replace(
    `<div style="display:flex;flex-direction:column;">
            <sc-for list="{{ hwProd }}" as="h" hint-placeholder-count="5">`,
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
            <sc-for list="{{ hwProd }}" as="h" hint-placeholder-count="5">`
  );
  t = t.replace(
    `<p style="margin:0;font-size:13.5px;line-height:1.55;color:var(--ink);"><strong style="font-weight:700;">These specifications are intended as starting points for validation and budgeting, not final procurement commitments.</strong> Production hardware will be finalized based on selected model, document volume, concurrent investigators, expected response time, context size, and performance testing.</p>`,
    `<p style="margin:0;font-size:13.5px;line-height:1.55;color:var(--ink);"><strong style="font-weight:700;">Final production sizing determined after validation.</strong> These specifications are starting points for validation and budgeting, not final procurement commitments. Production hardware will be finalized based on selected model, document volume, concurrent investigators, expected response time, context size, and performance testing.</p>`
  );

  // Roadmap - 5 columns + durations
  t = t.replace(
    'grid-template-columns:repeat(6,1fr);gap:14px;position:relative;z-index:1;',
    'grid-template-columns:repeat(5,1fr);gap:14px;position:relative;z-index:1;'
  );
  t = t.replace(
    'width:8%;background:var(--accent);border-radius:2px;',
    'width:12%;background:var(--accent);border-radius:2px;'
  );
  const phaseDurationInsert = `                <span style="font-size:10.5px;font-weight:600;letter-spacing:0.02em; {{ p.statusCss }}">{{ p.status }}</span>
              </div>
            </div>
          </sc-for>
        </div>
      </div>

      <div class="rv" style="margin-top:48px;max-width:640px;margin-left:auto;margin-right:auto;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:0;">
          <sc-for list="{{ phases }}" as="p" hint-placeholder-count="5">
            <div style="display:flex;flex-direction:column;align-items:center;width:100%;">
              <div style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 0;border-bottom:1px solid var(--hair);">
                <span style="font-size:14.5px;font-weight:700;letter-spacing:-0.015em; {{ p.titleCss }}">{{ p.title }}</span>
                <span style="font-family:'IBM Plex Mono',monospace;font-size:12px; {{ p.durationCss }}">{{ p.duration }}</span>
              </div>
              <sc-if value="{{ p.connector }}">
                <div class="pipe-connector" style="padding:2px 0;">
                  <i class="ph ph-caret-down" style="font-size:11px;color:var(--ink3);"></i>
                </div>
              </sc-if>
            </div>
          </sc-for>
        </div>
      </div>`;
  t = t.replace(
    `                <span style="font-size:10.5px;font-weight:600;letter-spacing:0.02em; {{ p.statusCss }}">{{ p.status }}</span>
              </div>
            </div>
          </sc-for>
        </div>
      </div>`,
    phaseDurationInsert
  );

  // Conclusion emphasis
  t = t.replace(
    `<div style="display:flex;flex-direction:column;gap:0;margin:34px auto 32px;max-width:560px;text-align:left;background:#fff;border:1px solid var(--accent-line);border-radius:16px;overflow:hidden;">
        <sc-for list="{{ recBullets }}" as="b" hint-placeholder-count="3">
          <div style="display:flex;align-items:center;gap:13px;padding:16px 20px;border-bottom:1px solid var(--hair);">
            <i class="ph ph-check-circle" style="font-size:20px;color:var(--accent-strong);flex-shrink:0;"></i>
            <span style="font-size:14.5px;font-weight:500;color:var(--ink);">{{ b }}</span>
          </div>
        </sc-for>
      </div>`,
    `<div style="display:flex;flex-direction:column;gap:0;margin:38px auto 36px;max-width:600px;text-align:left;background:#fff;border:1px solid var(--accent-line);border-radius:18px;overflow:hidden;box-shadow:0 12px 40px -20px color-mix(in oklab,var(--accent),transparent 25%);">
        <sc-for list="{{ recBullets }}" as="b" hint-placeholder-count="3">
          <div style="display:flex;align-items:flex-start;gap:16px;padding:22px 26px;border-bottom:1px solid var(--hair);">
            <i class="ph ph-check-circle" style="font-size:26px;color:var(--accent-strong);flex-shrink:0;margin-top:-1px;"></i>
            <span style="font-size:16px;font-weight:600;line-height:1.5;color:var(--ink);letter-spacing:-0.01em;">{{ b }}</span>
          </div>
        </sc-for>
      </div>`
  );
  // Add conclusion section label
  t = t.replace(
    `  <!-- ===================== RECOMMENDATION ===================== -->
  <section id="recommendation" style="padding:104px 32px;scroll-margin-top:80px;display:flex;justify-content:center;">
    <div class="rv" style="width:100%;max-width:820px;background:linear-gradient(180deg,#fff,var(--accent-tint));border:1px solid var(--accent-line);border-radius:26px;padding:56px 52px;text-align:center;box-shadow:0 40px 90px -50px color-mix(in oklab,var(--accent),transparent 20%);">
      <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border:1px solid var(--accent-line);border-radius:100px;background:#fff;margin-bottom:26px;">
        <i class="ph ph-seal-check" style="font-size:15px;color:var(--accent-strong);"></i>
        <span style="font-family:'IBM Plex Mono',monospace;font-size:10.5px;font-weight:500;letter-spacing:0.08em;color:var(--accent-strong);text-transform:uppercase;">Proposed Architecture</span>
      </div>`,
    `  <!-- ===================== RECOMMENDATION ===================== -->
  <section id="recommendation" class="sec-pad">
    <div class="rv" style="width:100%;max-width:820px;background:linear-gradient(180deg,#fff,var(--accent-tint));border:1px solid var(--accent-line);border-radius:26px;padding:56px 52px;text-align:center;box-shadow:0 40px 90px -50px color-mix(in oklab,var(--accent),transparent 20%);">
      <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.1em;color:var(--accent-strong);text-transform:uppercase;display:block;margin-bottom:20px;">11 / Conclusion</span>
      <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border:1px solid var(--accent-line);border-radius:100px;background:#fff;margin-bottom:26px;">
        <i class="ph ph-seal-check" style="font-size:15px;color:var(--accent-strong);"></i>
        <span style="font-family:'IBM Plex Mono',monospace;font-size:10.5px;font-weight:500;letter-spacing:0.08em;color:var(--accent-strong);text-transform:uppercase;">Proposed Architecture</span>
      </div>`
  );

  // Replace renderVals entirely
  t = t.replace(/  renderVals\(\) \{[\s\S]*?    \};\n  \}/, RENDER_VALS_NEW);

  // Add connector to phases in mapping - need to fix RENDER_VALS to include connector on phases
  // Already in phaseDurationInsert uses p.connector - add to phases map
  t = t.replace(
    `const phases = phaseRaw.map(p => ({
      ...p,
      dotCss: p.current`,
    `const phases = phaseRaw.map((p, i) => ({
      ...p,
      connector: i < phaseRaw.length - 1,
      dotCss: p.current`
  );

  // Footer title consistency
  t = t.replace('Forensic Investigation AI Platform', 'Forensic Investigation AI Architecture');

  const fixed = writeBundled(html, t);
  fs.writeFileSync(HTML_PATH, fixed);

  // Verify
  JSON.parse(
    fixed.slice(fixed.indexOf('<script type="__bundler/template">') + 34, fixed.lastIndexOf('</script>', fixed.lastIndexOf('</body>')))
  );
  console.log('Patch applied successfully. Template validates.');
}

main();
