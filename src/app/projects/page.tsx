'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Cursor from '@/components/Cursor';
import {
  cursorHello,
  removeCursorHello,
  cursorBlow,
  removeCursorBlow,
  cursorHide,
  cursorShow,
  initCursor
} from '@/lib/gsap-utils';

interface WorkItem {
  id: string;
  title: string;
  description: string;
  roles: string[];
  image?: string;
  video?: string;
  iframe?: string;
  gallery?: { id: string; src: string }[];
  cta?: { text: string; url: string };
}

const workItems: { [key: string]: WorkItem } = {
  receptiv: {
    id: 'receptiv',
    title: 'Putting human experience at the center of digital advertising',
    description: `Receptiv was a reward based mobile video in-app advertising company. Their platform was engineered to understand human emotion and build a real-time ad experience that reacts to each unique user delivering context.<br><br>That combination made for an immersive and engaging brand-to-human experience. With over 1,300 SDK App Integrations, Receptiv increased ad performance by 300%<br><br>With Receptiv's technology and behavioral & predictive data, I succeeded in shaping their flagship products to put people first.<br><br>As employee #28, I quickly evolved their existing solutions, built and launched new high-impact products that generated over $68 million a year.`,
    roles: ['Creative Direction', 'Innovation', 'Management'],
    image: '/creative/work/work-receptiv-dell.png',
    gallery: [
      { id: 'imgReceptivthmb1', src: '/creative/work/receptiv-img-1.png' },
      { id: 'imgReceptivthmb2', src: '/creative/work/receptiv-img-2.png' },
      { id: 'imgReceptivthmb3', src: '/creative/work/receptiv-img-3.png' },
      { id: 'imgReceptivthmb4', src: '/creative/work/receptiv-img-4.png' },
      { id: 'imgReceptivthmb5', src: '/creative/work/receptiv-img-5.png' },
    ]
  },
  roulette: {
    id: 'roulette',
    title: "Don't know what to watch?",
    description: `With so much great television content out there, indecision is sometimes inevitable. Ever have late nights where you just want to sit back and not have to worry about what to watch next?<br><br>The TV Roulette App will enable consumers to quickly find an episode from TV they love - Easily, Quickly, Delightfully.`,
    roles: ['Research', 'Content Strategy', 'User Experience', 'UI Design', 'UI Animation', 'HTML Prototype'],
    image: '/creative/work/work-roulette.png'
  },
  'setf-lease-end': {
    id: 'setf-lease-end',
    title: 'Lease turn in made easy',
    description: `This solution is to provide Southease Toyota Finance lease customers a complete and clear understanding of the options, processes, considerations, and related implications associated with ending a lease.<br><br>Not every lease-end journey is the same. The customer will either turn in the vehicle, extend their current lease, or purchase the vehicle. The solution clearly communicated the lease-end process to prepare customers for a smooth lease-end transition.<br><br>This also gave the opportunity for SETF to capture analytics about lease-end customers, drive new lease opportunites to dealers, and retain existing customers.`,
    roles: ['Research', 'Content Strategy', 'User Experience', 'UI Design', 'UI Animation', 'HTML Prototype'],
    iframe: '/creative/work/setf-lease-end-experience/index.html'
  },
  'setf-cws': {
    id: 'setf-cws',
    title: 'Customer Website Redesign',
    description: `Southeast Toyota Finance services (SETF) original website significantly limited SETF's ability to control the presentation of content and while SETF ranks highly for consumer financing satisfaction, its website didn't positively extend or enhance the brand, was payment-focused, and offered little value-added content - providing no reason to stay - let alone stay in the driver's seat of a Toyota at the end-of-lease or once their last payment was made.<br><br>In collaboration with SETF, we evolved its payment-focused website into an award winning platform to create deeper and longer-lasting relationships with its customers and improve customer retention while minimizing the impact on their existing processes and technologies.`,
    roles: ['Research', 'Content Strategy', 'Information Architecture', 'User Experience', 'UI Design', 'Prototype'],
    image: '/creative/work/work-setf-cws-process.png',
    gallery: [
      { id: 'imgSETFthmb1', src: '/creative/work/setf-cws-img-1.png' },
      { id: 'imgSETFthmb2', src: '/creative/work/setf-cws-img-2.png' },
      { id: 'imgSETFthmb3', src: '/creative/work/setf-cws-img-3.png' },
    ],
    cta: { text: 'Launch Website', url: 'https://www.setf.com/' }
  },
  'vitas-acep': {
    id: 'vitas-acep',
    title: 'VITAS Healthcare Billboard',
    description: `I was tasked to execute a video for VITAS Healthcare that would engage a moving audience during an ACEP Conference. The video needed to capture the essence of the brand and express exactly what they wanted the audience to understand about their service.<br><br>Animation was the key factor that was proven effective in creating this billboard that communicated clearly and quickly the information in an interesting, creative and memorable way.`,
    roles: ['Visual Design', 'Animation'],
    video: '/creative/work/work-vitas-acep.mp4'
  }
};

export default function ProjectsPage() {
  const router = useRouter();
  const hamburgerRef = useRef(true);
  const menuClosedRef = useRef(true);
  const gsapRef = useRef<any>(null);
  const ScrollTriggerRef = useRef<any>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [currentWork, setCurrentWork] = useState<WorkItem | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;

      gsap.registerPlugin(ScrollTrigger);
      gsapRef.current = gsap;
      ScrollTriggerRef.current = ScrollTrigger;

      // Initialize circle cursor
      const circle = document.getElementById('circle');
      if (circle) {
        const circleStyle = circle.style;
        document.addEventListener('mousemove', e => {
          window.requestAnimationFrame(() => {
            circleStyle.top = `${e.clientY - circle.offsetHeight / 2}px`;
            circleStyle.left = `${e.clientX - circle.offsetWidth / 2}px`;
          });
        });
      }

      // Initialize custom cursor
      initCursor();

      // Scroll event handlers
      const myScrollScript = () => {
        cursorBlow();
        gsap.set('#cursorAsset', { autoAlpha: 0 });
      };

      window.addEventListener("scroll", myScrollScript);

      const createScrollStopListener = (element: Window, callback: () => void, timeout: number = 50) => {
        let handle: NodeJS.Timeout | null = null;
        const onScroll = () => {
          if (handle) clearTimeout(handle);
          handle = setTimeout(callback, timeout);
        };
        element.addEventListener('scroll', onScroll);
        return () => element.removeEventListener('scroll', onScroll);
      };

      createScrollStopListener(window, () => {
        removeCursorBlow();
        gsap.set('#cursorAsset', { autoAlpha: 1 });
      });

      // ScrollTrigger for logo
      ScrollTrigger.matchMedia({
        "(min-width: 1280px)": function () {
          const logoCollapse = gsap.timeline({
            scrollTrigger: {
              trigger: ".jv-logo",
              scrub: true,
              start: "240px 20%",
              end: "+=80px",
            }
          });

          logoCollapse.to('.logo-johnathan-mask', { duration: .4, width: '6px', x: -44, ease: 'power2.out' })
            .to('.logo-valencia-mask', { duration: .4, width: '12px', x: -45, ease: 'power2.out' }, 0)
            .to('.logo-end-mask', { duration: .4, x: -45, ease: 'power2.out' }, 0);
        }
      });

      // Show work case studies
      gsap.set('.work_case-studies', { display: 'block' });

      // Animate cards
      const animateFrom = (elem: HTMLElement, direction: number = 1) => {
        ScrollTrigger.matchMedia({
          "(max-width: 439px)": function () {
            let x = 0, y = direction * 40;
            elem.style.transform = "translate(" + x + "px, " + y + "px)";
            elem.style.opacity = "0";
            gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
              duration: 1.25,
              x: 0,
              y: 0,
              autoAlpha: 1,
              ease: "expo",
              overwrite: "auto"
            });
          },
          "(min-width: 440px)": function () {
            let x = 0, y = direction * 100;
            if (elem.classList.contains("gs_reveal_fromLeft")) {
              x = -100;
              y = direction * 50;
            } else if (elem.classList.contains("gs_reveal_fromRight")) {
              x = 100;
              y = direction * 50;
            }
            elem.style.transform = "translate(" + x + "px, " + y + "px)";
            elem.style.opacity = "0";
            gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
              duration: 1.25,
              x: 0,
              y: 0,
              autoAlpha: 1,
              ease: "expo",
              overwrite: "auto",
              delay: .2
            });
          }
        });
      };

      const hide = (elem: HTMLElement) => {
        gsap.set(elem, { autoAlpha: 0 });
      };

      gsap.utils.toArray(".gs_reveal").forEach(function (elem: any) {
        hide(elem);
        ScrollTrigger.create({
          trigger: elem,
          onEnter: function () { animateFrom(elem) },
          onEnterBack: function () { animateFrom(elem, -1) },
          onLeave: function () { hide(elem) }
        });
      });
    };

    initGSAP();
  }, []);

  // Menu functions
  const openMenu = useCallback(() => {
    const gsap = gsapRef.current;
    if (!gsap) return;

    menuClosedRef.current = false;
    gsap.to('.menu .top', { duration: .4, transformOrigin: 'top left', x: 3, y: -2, rotation: 45, ease: 'expo.out' });
    gsap.to('.menu .bottom', { duration: .4, transformOrigin: 'bottom left', x: 3, y: 2, rotation: -45, ease: 'expo.out' });
    gsap.to('.menu .anchor', {
      duration: .4, x: 60, autoAlpha: 0, ease: 'expo.out', onComplete: () => {
        hamburgerRef.current = false;
      }
    });
    gsap.set('.menu-items', { display: 'flex', autoAlpha: 1 });
    gsap.fromTo(['.menu-items .projects', '.menu-items .contact'],
      { perspective: 800, transformStyle: "preserve-3d", transformOrigin: 'top right', autoAlpha: 0, y: 100, rotationZ: 90, rotationY: 90, x: 48 },
      { duration: .8, autoAlpha: 1, rotationZ: 0, y: 0, rotationY: 0, x: 0, stagger: .05, ease: 'expo.out' }
    );
  }, []);

  const closeMenu = useCallback(() => {
    const gsap = gsapRef.current;
    if (!gsap) return;

    gsap.to(['.menu-items .contact', '.menu-items .projects'],
      { duration: .4, autoAlpha: 0, ease: 'expo.out' }
    );
    gsap.set('.menu-items', { delay: .4, autoAlpha: 0, display: 'none' });
    gsap.to('.menu .anchor', { duration: .4, x: 0, autoAlpha: 1, ease: 'expo.out' });
    gsap.to('.menu .anchor', { delay: .2, duration: .2, x: 0, width: '24px', height: '3px', ease: 'expo.out' });
    gsap.to('.menu .top', { delay: .15, duration: .4, transformOrigin: 'top left', x: 0, y: 0, rotation: 0, ease: 'expo.out' });
    gsap.to('.menu .bottom', {
      delay: .15, duration: .4, transformOrigin: 'bottom left', x: 0, y: 0, rotation: 0, ease: 'expo.out', onComplete: () => {
        hamburgerRef.current = true;
        menuClosedRef.current = true;
      }
    });
    removeCursorBlow();
  }, []);

  const initMenu = useCallback(() => {
    if (hamburgerRef.current) {
      openMenu();
    } else {
      closeMenu();
    }
    cursorShow();
  }, [openMenu, closeMenu]);

  const menuHover = useCallback(() => {
    const gsap = gsapRef.current;
    if (!gsap) return;

    if (menuClosedRef.current) {
      gsap.to('.menu .anchor', { duration: .2, x: 29, width: '3px', height: '3px', ease: 'expo.out' });
      cursorHide();
      cursorBlow();
    }
  }, []);

  const menuHoverOut = useCallback(() => {
    const gsap = gsapRef.current;
    if (!gsap) return;

    if (menuClosedRef.current) {
      gsap.to('.menu .anchor', { duration: .2, x: 0, width: '24px', height: '3px', ease: 'expo.out' });
      cursorShow();
      removeCursorBlow();
    }
  }, []);

  const initHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const openProjects = useCallback(() => {
    router.push('/projects');
  }, [router]);

  const gotoContact = useCallback(() => {
    router.push('/?portfolio=johnathan');
  }, [router]);

  const openCaseStudy = useCallback((item: string) => {
    if (item === 'setf-collections') {
      router.push('/setf-collections');
    }
  }, [router]);

  const initWork = useCallback((item: string) => {
    const gsap = gsapRef.current;
    const work = workItems[item];
    if (!work || !gsap) return;

    setCurrentWork(work);
    if (work.image) setCurrentImage(work.image);
    setOverlayOpen(true);

    gsap.set('.page-work section', { height: '100vh' });
    gsap.fromTo('#workOverlay', { autoAlpha: 0 }, { duration: .4, autoAlpha: 1, ease: 'expo.out' });
    gsap.fromTo('.work-wrapper', { autoAlpha: 0, scale: .96, y: 120 }, { duration: .8, autoAlpha: 1, scale: 1, y: 0, ease: 'expo.out' });
  }, []);

  const closeOverlay = useCallback(() => {
    const gsap = gsapRef.current;
    if (!gsap) return;

    setOverlayOpen(false);
    setCurrentWork(null);
    setCurrentImage('');
    gsap.set('.page-work section', { height: 'auto' });
  }, []);

  const handleGalleryClick = useCallback((item: string, workId: string) => {
    const gsap = gsapRef.current;
    if (!gsap) return;

    const imageMap: { [key: string]: { [key: string]: string } } = {
      'setf-cws': {
        'img1': '/creative/work/work-setf-cws-process.png',
        'img2': '/creative/work/work-setf-cws-unauthenticated.png',
        'img3': '/creative/work/work-setf-cws-authenticated.png',
      },
      'receptiv': {
        'img1': '/creative/work/work-receptiv-dell.png',
        'img2': '/creative/work/work-receptiv-chipotle.png',
        'img3': '/creative/work/work-receptiv-twix.png',
        'img4': '/creative/work/work-receptiv-cider.png',
        'img5': '/creative/work/work-receptiv-dole.png',
      }
    };

    if (imageMap[workId] && imageMap[workId][item]) {
      setCurrentImage(imageMap[workId][item]);
    }
  }, []);

  return (
    <>
      <Header onLogoClick={initHome} />

      <main>
        <div className="page-work">
          <section>
            <div className="content">
              <div id="workCaseStudies" className="work_case-studies" style={{ display: overlayOpen ? 'none' : 'block' }}>
                <div className="cards_work-case-studies">
                  <div className="card gs_reveal gs_reveal_fromLeft" onClick={() => openCaseStudy('setf-collections')}>
                    <div className="card-body">
                      <img src="/creative/work/work-setf-collections-thmb.png" width="100%" height="auto" alt="SETF Collections" />
                      <div className="caption">
                        <h5>Human experience at the center of deliquent accounts</h5>
                        <div className="tag">Award Winning</div>
                      </div>
                    </div>
                  </div>
                  <div className="card gs_reveal gs_reveal_fromRight" onClick={() => initWork('receptiv')}>
                    <div className="card-body">
                      <img src="/creative/work/work-receptiv-thmb.png" width="100%" height="auto" alt="Receptiv" />
                      <div className="caption">
                        <h5>Human experience at the center of digital advertising</h5>
                        <div className="tag">Award Winning</div>
                      </div>
                    </div>
                  </div>
                  <div className="card gs_reveal gs_reveal_fromLeft" onClick={() => initWork('roulette')}>
                    <div className="card-body">
                      <img src="/creative/work/work-roulette-thmb.png" width="100%" height="auto" alt="TV Roulette" />
                      <div className="caption">
                        <h5>Don't know what to watch?</h5>
                      </div>
                    </div>
                  </div>
                  <div className="card gs_reveal gs_reveal_fromRight" onClick={() => initWork('setf-lease-end')}>
                    <div className="card-body">
                      <img src="/creative/work/work-setf-lease-end-thmb.png" width="100%" height="auto" alt="SETF Lease End" />
                      <div className="caption">
                        <h5>Lease turn in made easy</h5>
                      </div>
                    </div>
                  </div>
                  <div className="card gs_reveal gs_reveal_fromLeft" onClick={() => initWork('setf-cws')}>
                    <div className="card-body">
                      <img src="/creative/work/work-setf-cws-thmb.png" width="100%" height="auto" alt="SETF CWS" />
                      <div className="caption">
                        <h5>Auto financial services website redesign</h5>
                        <div className="tag">Award Winning</div>
                      </div>
                    </div>
                  </div>
                  <div className="card gs_reveal gs_reveal_fromRight" onClick={() => initWork('vitas-acep')}>
                    <div className="card-body">
                      <img src="/creative/work/work-vitas-acep-thmb.png" width="100%" height="auto" alt="VITAS ACEP" />
                      <div className="caption">
                        <h5>Healthcare video billboard</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {overlayOpen && currentWork && (
            <div id="workOverlay" className="work-overlay" style={{ display: 'flex' }}>
              <div className="close">
                <img src="/creative/close.svg" width="100%" height="auto" onClick={closeOverlay} alt="Close" />
              </div>
              <div className="work-wrapper">
                <div className="content">
                  <div className="work-info">
                    {currentWork.image && (
                      <div id="imgWrapper" className="img-wrapper" style={{ display: 'block' }}>
                        <img src={currentImage || currentWork.image} width="100%" height="auto" alt={currentWork.title} />
                      </div>
                    )}
                    {currentWork.video && (
                      <div id="videoWrapper" className="video-wrapper" style={{ display: 'block' }}>
                        <video id="vitasVideo" autoPlay controls>
                          <source src={currentWork.video} type="video/mp4" />
                        </video>
                      </div>
                    )}
                    {currentWork.gallery && (
                      <div id="galleryWrapper" className="gallery-wrapper" style={{ display: 'flex' }}>
                        <ul id="thmbWrapper">
                          {currentWork.gallery.map((item, index) => (
                            <li
                              key={item.id}
                              id={item.id}
                              onClick={() => handleGalleryClick(`img${index + 1}`, currentWork.id)}
                            >
                              <img src={item.src} width="100%" height="auto" alt="" />
                            </li>
                          ))}
                        </ul>
                        {currentWork.cta && (
                          <div id="cta" className="cta" style={{ display: 'block' }}>
                            <a href={currentWork.cta.url} target="_blank" rel="noopener noreferrer">{currentWork.cta.text}</a>
                          </div>
                        )}
                      </div>
                    )}
                    {currentWork.iframe && (
                      <div id="iframeWrapper" className="iframe-wrapper" style={{ display: 'block' }}>
                        <iframe src={currentWork.iframe} height="800px" width="100%" style={{ border: 'none' }}></iframe>
                      </div>
                    )}
                    <div className="info">
                      <h3 id="workTitle">{currentWork.title}</h3>
                      <p id="workDescription" dangerouslySetInnerHTML={{ __html: currentWork.description }}></p>
                      <div className="responsibilites">
                        <h4>Responsibilites</h4>
                        <ul id="rolesList" className="roles">
                          {currentWork.roles.map((role, index) => (
                            <li key={index}>{role}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Cursor />
        </div>
      </main>
    </>
  );
}
