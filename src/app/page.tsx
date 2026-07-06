'use client';

import { useCallback } from 'react';
import Header from '@/components/Header';

function HomeContent() {
  const anchorTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Header onLogoClick={anchorTop} />

      <main>
        <section className="full-height">
          <div className="landing">
            <div className="content hero">
              <div className="hero-copy">
                <h2 className="hero-name hidden">Johnathan Valencia</h2>
                <div className="text-xl md:text-3xl font-normal leading-[1.4] text-[var(--dark-color)] m-0 p-0">Product executive turning AI innovation into trusted, human-centered experiences—from vision to scale.</div>
                <p className="hero-tagline hidden">Innovative product leader shaping experiences that are deeply human, engaging, and unforgettable.</p>
                <p className="hero-headline hidden">AI Product Leader | Head of Product at PathLLM.ai | Building AI-native products from 0→1 | Product, Design, Systems</p>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="below-fold hidden">
          <section className="section-case-study-mobile primero">
            <div className="content">
              <div className="case-study-mobile">
                <div className="case-study__client">
                  <h2>Southeast Toyota Finance</h2>
                  <h3>Putting human experience at the center of delinquent accounts.</h3>
                  <a href="/setf-collections"><span className="cta-btn">See case study</span></a>
                </div>
                <div className="img-wrapper">
                  <img src="/creative/home-case-study/setf-img-mobile.png" width="100%" height="auto" alt="SETF Case Study" />
                </div>
              </div>
            </div>
          </section>

          <section className="section-case-study-mobile">
            <div className="content">
              <div className="case-study-mobile">
                <div className="case-study__client">
                  <h2>Receptiv</h2>
                  <h3>Putting human experience at the center of digital advertising.</h3>
                  <span className="cta-btn">Case study will be available soon</span>
                </div>
                <div className="img-wrapper">
                  <img src="/creative/home-case-study/receptiv-img-mobile.png" width="100%" height="auto" alt="Receptiv Case Study" />
                </div>
              </div>
            </div>
          </section>

          <section className="section-case-study-receptiv">
            <div className="content case-study">
              <div className="case-study__asset">
                <div className="receptiv">
                  <div className="receptiv__dot">
                    <div className="publisher publisher__twodots"></div>
                    <div className="publisher publisher__myboo"></div>
                    <div className="publisher publisher__sonic"></div>
                    <div className="publisher publisher__ruzzle"></div>
                    <div className="publisher publisher__flick"></div>
                    <div className="publisher publisher__buggy"></div>
                  </div>
                  <div className="receptiv__device">
                    <div className="setf-poster-1"></div>
                    <div className="setf-poster-2"></div>
                    <div className="receptiv-video-wrapper">
                      <video width="375" height="667" id="receptivideo" playsInline preload="auto">
                        <source src="/creative/receptiv.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              <div className="case-study__client">
                <h2>Southeast Toyota Finance</h2>
                <h3>Putting human experience at the center of delinquent accounts.</h3>
                <a href="/setf-collections" className="cta-btn">See case study</a>
              </div>
            </div>
          </section>

          <section className="section-case-study-setf">
            <div className="content case-study">
              <div className="case-study__client">
                <h2>Receptiv</h2>
                <h3>Putting human experience at the center of digital advertising.</h3>
                <span className="cta-btn">available soon</span>
              </div>
              <div></div>
            </div>
          </section>

          <section className="section-capabilities">
            <div className="content">
              <div className="capabilities">
                <div className="three-split">
                  <h2>Capabilities</h2>
                  <div className="gif-wrapper">
                    <div id="gifAsset"></div>
                  </div>
                </div>
                <div className="three-split">
                  <h3>Heart of a designer.</h3>
                  <div className="list">
                    <div className="list-item"><span>Product Design</span><span className="bullet">&bull;</span><div className="list-border"></div></div>
                    <div className="list-item"><span>Product Strategy</span><span className="bullet">&bull;</span><div className="list-border"></div></div>
                    <div className="list-item"><span>UX/UI Design</span><span className="bullet">&bull;</span><div className="list-border"></div></div>
                    <div className="list-item"><span>User Research</span><span className="bullet">&bull;</span><div className="list-border"></div></div>
                    <div className="list-item"><span>User Testing</span><span className="bullet">&bull;</span><div className="list-border"></div></div>
                  </div>
                </div>
                <div className="three-split">
                  <h3>Brain of an engineer.</h3>
                  <div className="list">
                    <div className="list-item"><span>Rapid Prototyping</span><span className="bullet">&bull;</span><div className="list-border"></div></div>
                    <div className="list-item"><span>Front End Development</span><span className="bullet">&bull;</span><div className="list-border"></div></div>
                    <div className="list-item"><span>UI Animation</span><span className="bullet">&bull;</span><div className="list-border"></div></div>
                    <div className="list-item"><span>Microinteraction</span><span className="bullet">&bull;</span><div className="list-border"></div></div>
                    <div className="list-item"><span>A/B Testing</span><span className="bullet">&bull;</span><div className="list-border"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-character">
            <div className="content">
              <div className="character">
                <h2>Character</h2>
                <div id="tabOne">
                  <h3>I help businesses by bringing an empathetic mindset, human-centered methodologies and best practices of a UX process to their challenges.</h3>
                  <h3>At the right moment, clear messaging and micro-interactions can create an emotional connection between the user and your brand.</h3>
                </div>
              </div>
            </div>
          </section>

          <section className="section-collaboration">
            <div className="content">
              <div className="collaboration">
                <div className="info">
                  <h2>Collaboration</h2>
                  <h3>Over the last 13 years, I&apos;ve partnered with some world&apos;s leading companies in every industry vertical.</h3>
                  <h3>An informed, uninterrupted, and engaged user = the ultimate KPI.</h3>
                </div>
              </div>
            </div>
          </section>

          <section className="section-contact">
            <div className="content">
              <div className="contact">
                <div className="contact-wrapper">
                  <h2>Want to bring your idea to life or just want to talk UX?<br />Lets connect!</h2>
                </div>
              </div>
            </div>
          </section>
        </div> */}
      </main>
    </>
  );
}

export default function Home() {
  return <HomeContent />;
}
