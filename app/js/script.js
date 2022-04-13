var d = document,
    hamburger = true,
    menuClosed = true,
    page = 'home',
    characterThem = document.getElementById("characterThem"),
    characterMe = document.getElementById("characterMe");

gsap.registerPlugin(ScrollTrigger);

const circle = document.getElementById('circle');
const circleStyle = circle.style;

document.addEventListener('mousemove', e => {
  window.requestAnimationFrame(() => {
    circleStyle.top = `${ e.clientY - circle.offsetHeight/2 }px`;
    circleStyle.left = `${ e.clientX - circle.offsetWidth/2 }px`;
  });
});

window.addEventListener("scroll", myScrollScript);

function myScrollScript() {
  cursorBlow();
  gsap.set('#cursorAsset', { autoAlpha:0 });
}

function createScrollStopListener(element, callback, timeout) {
  var handle = null;
  var onScroll = function() {
      if (handle) {
          clearTimeout(handle);
      }
      handle = setTimeout(callback, timeout || 50); // default 200 ms
  };
  element.addEventListener('scroll', onScroll);
  return function() {
      element.removeEventListener('scroll', onScroll);
  };
}

createScrollStopListener(window, function() {
  // console.log('onscrollstop');
  removeCursorBlow();
  gsap.set('#cursorAsset', { autoAlpha:1 });
});

arrowRight.style.opacity = "1";

function initMenu() {
  if ( hamburger == true ) {
    openMenu();
  } else if ( hamburger == false ) {
    closeMenu();
  }
  cursorShow();
}

function menuHover() {
  if ( menuClosed == true ) {
    gsap.to('.menu .anchor', { duration:.2, x:29, width:'3px', height:'3px', ease:Expo.easeOut });
    cursorHide();
    cursorBlow();
  }
}

function menuHoverOut() {
  if ( menuClosed == true ) {
    gsap.to('.menu .anchor', { duration:.2, x:0, width:'24px', height:'3px', ease:Expo.easeOut });
    cursorShow();
    removeCursorBlow();
  }
}

function openMenu() {
  menuClosed = false;
  gsap.to('.menu .top', { duration:.4, transformOrigin:'top left', x:3, y:-2, rotation:45, ease:Expo.easeOut });
  gsap.to('.menu .bottom', { duration:.4, transformOrigin:'bottom left', x:3, y:2, rotation:-45, ease:Expo.easeOut });
  // gsap.to('.menu .anchor', { duration:.4, width:'3px', height:'24px', x:29, y:56.5, ease:Expo.easeOut, onComplete:function() {
  //   hamburger = false;
  // } });
  gsap.to('.menu .anchor', { duration:.4, x:60, autoAlpha:0, ease:Expo.easeOut, onComplete:function() {
    hamburger = false;
  } });
  gsap.set('.menu-items', { display:'flex', autoAlpha:1 });
  gsap.fromTo(['.menu-items .intro', '.menu-items .case-studies', '.menu-items .capabilities', '.menu-items .character', '.menu-items .collaboration', '.menu-items .contact'], 
    { perspective:800, transformStyle:"preserve-3d", transformOrigin:'top right', autoAlpha:0, y:100, rotationZ:90, rotationY:90, x:48 }, { duration: .8, autoAlpha:1, rotationZ:0, y:0, rotationY:0, x:0, stagger: .05, ease:Expo.easeOut }
  );
}

function closeMenu() {
  gsap.to(['.menu-items .contact', '.menu-items .collaboration', '.menu-items .character', '.menu-items .capabilities', '.menu-items .case-studies', '.menu-items .intro'], 
    { duration: .4, autoAlpha:0, ease:Expo.easeOut }
  );
  gsap.set('.menu-items', { delay:.4, autoAlpha:0, display:'none' });
  // gsap.to('.menu .anchor', { duration:.4, width:'3px', height:'3px', y:0, ease:Expo.easeOut });
  gsap.to('.menu .anchor', { duration:.4, x:0, autoAlpha:1, ease:Expo.easeOut });
  gsap.to('.menu .anchor', { delay: .2, duration:.2, x:0, width:'24px', height:'3px', ease:Expo.easeOut });
  gsap.to('.menu .top', { delay:.15, duration:.4, transformOrigin:'top left', x:0, y:0, rotation:0, ease:Expo.easeOut });
  gsap.to('.menu .bottom', { delay:.15, duration:.4, transformOrigin:'bottom left', x:0, y:0, rotation:0, ease:Expo.easeOut, onComplete: function() {
    hamburger = true;
    menuClosed = true;
  } });
  removeCursorBlow();
}

function checkMenuStatus() {
  if ( menuClosed == false ) {
    closeMenu();
  } 
}

function showThem() { 
  characterThem.className = "tab";
  characterMe.className = "tab not-selected";
  tabOne.style.display = 'none';
  tabTwo.style.display = 'flex';
  arrows.style.display = 'flex';
}

function showMe() { 
  characterThem.className = "tab not-selected";
  characterMe.className = "tab";
  tabOne.style.display = 'block';
  tabTwo.style.display = 'none';
  arrows.style.display = 'none';
}

function swipe(item) {
  if (item === 'right') {
    gsap.to('#tabTwo', { duration:.4, left:'-101.4%', ease:'expo.out' });
  } else if (item === 'left') {
    gsap.to('#tabTwo', { duration:.4, left:'0', ease:'expo.out' });
  }
}

function anchor(item) {
  if ( item == 'introduction' ) {
    window.location.href = '#introduction';
  } else if ( item == 'casestudies' ) {
    window.location.href = '#case-study-receptiv';
  } else if ( item == 'capabilities' ) {
    window.location.href = '#capabilities';
  } else if ( item == 'character' ) {
    window.location.href = '#character';
  } else if ( item == 'collaboration' ) {
    window.location.href = '#collaboration';
  } else if ( item == 'contact' ) {
    window.location.href = '#contact';
  }
  closeMenu();
}

// Cursor
var cursor = {
  delay: 4,
  _x: 0,
  _y: 0,
  endX: (window.innerWidth / 2),
  endY: (window.innerHeight / 2),
  cursorVisible: true,
  cursorEnlarged: false,
  $dot: document.querySelector('.cursor-dot'),
  $outline: document.querySelector('.cursor-dot-outline'),
  
  init: function() {
      // Set up element sizes
      this.dotSize = this.$dot.offsetWidth;
      this.outlineSize = this.$outline.offsetWidth;
      
      this.setupEventListeners();
      this.animateDotOutline();
  },
  
//     updateCursor: function(e) {
//         var self = this;
      
//         console.log(e)
      
//         // Show the cursor
//         self.cursorVisible = true;
//         self.toggleCursorVisibility();

//         // Position the dot
//         self.endX = e.pageX;
//         self.endY = e.pageY;
//         self.$dot.style.top = self.endY + 'px';
//         self.$dot.style.left = self.endX + 'px';
//     },
  
  setupEventListeners: function() {
      var self = this;
      
      // Anchor hovering
      document.querySelectorAll('a').forEach(function(el) {
          el.addEventListener('mouseover', function() {
              self.cursorEnlarged = true;
              self.toggleCursorSize();
          });
          el.addEventListener('mouseout', function() {
              self.cursorEnlarged = false;
              self.toggleCursorSize();
          });
      });
      
      // Click events
      document.addEventListener('mousedown', function() {
          self.cursorEnlarged = true;
          self.toggleCursorSize();
      });
      document.addEventListener('mouseup', function() {
          self.cursorEnlarged = false;
          self.toggleCursorSize();
      });


      document.addEventListener('mousemove', function(e) {
          // Show the cursor
          self.cursorVisible = true;
          self.toggleCursorVisibility();

          // Position the dot
          self.endX = e.pageX;
          self.endY = e.pageY;
          self.$dot.style.top = self.endY + 'px';
          self.$dot.style.left = self.endX + 'px';
      });
      
      // Hide/show cursor
      document.addEventListener('mouseenter', function(e) {
          self.cursorVisible = true;
          self.toggleCursorVisibility();
          self.$dot.style.opacity = 1;
          self.$outline.style.opacity = 1;
      });
      
      document.addEventListener('mouseleave', function(e) {
          self.cursorVisible = true;
          self.toggleCursorVisibility();
          self.$dot.style.opacity = 0;
          self.$outline.style.opacity = 0;
      });
  },
  
  animateDotOutline: function() {
      var self = this;
      
      self._x += (self.endX - self._x) / self.delay;
      self._y += (self.endY - self._y) / self.delay;
      self.$outline.style.top = self._y + 'px';
      self.$outline.style.left = self._x + 'px';
      
      requestAnimationFrame(this.animateDotOutline.bind(self));
  },
  
  toggleCursorSize: function() {
      var self = this;
      
      if (self.cursorEnlarged) {
          self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
          self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      } else {
          self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
          self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
      }
  },
  
  toggleCursorVisibility: function() {
      var self = this;
      
      if (self.cursorVisible) {
          self.$dot.style.opacity = 1;
          self.$outline.style.opacity = 1;
      } else {
          self.$dot.style.opacity = 0;
          self.$outline.style.opacity = 0;
      }
  }
}

cursor.init();

function cursorHello() {
  var element, name, arr;
  element = document.getElementById("cursorAsset");
  name = "cursor-hello";
  arr = element.className.split(" ");
  if (arr.indexOf(name) == -1) {
    element.className += " " + name;
  }
}

function removeCursorHello() {
  element = document.getElementById("cursorAsset");
  element.className = element.className.replace(/\bcursor-hello\b/g, "");
}

function cursorBtn() {
  var element, name, arr;
  element = document.getElementById("cursorStyle");
  name = "cursor-outline-btn";
  arr = element.className.split(" ");
  if (arr.indexOf(name) == -1) {
    element.className += " " + name;
  }
  cursorHide();
}

function removeCursorBtn() {
  element = document.getElementById("cursorStyle");
  element.className = element.className.replace(/\bcursor-outline-btn\b/g, "");
  cursorShow();
}

function cursorBlow() {
  var element, name, arr;
  element = document.getElementById("cursorStyle");
  name = "cursor-outline-blow";
  arr = element.className.split(" ");
  if (arr.indexOf(name) == -1) {
    element.className += " " + name;
  }
}

function removeCursorBlow() {
  element = document.getElementById("cursorStyle");
  element.className = element.className.replace(/\bcursor-outline-blow\b/g, "");
}

function cursorLaptop() {
  var element, name, arr;
  element = document.getElementById("cursorAsset");
  name = "cursor-laptop";
  arr = element.className.split(" ");
  if (arr.indexOf(name) == -1) {
    element.className += " " + name;
  }
}

function removeCursorLaptop() {
  element = document.getElementById("cursorAsset");
  element.className = element.className.replace(/\bcursor-laptop\b/g, "");
}

function cursorHide() {
  var element, name, arr;
  // element = document.getElementById("cursorAsset");
  element = document.getElementById("circle");
  name = "cursor-hide";
  arr = element.className.split(" ");
  if (arr.indexOf(name) == -1) {
    element.className += " " + name;
  }
}

function cursorShow() {
  // element = document.getElementById("cursorAsset");
  element = document.getElementById("circle");
  element.className = element.className.replace(/\bcursor-hide\b/g, "");
}

//////// SCROLL TRIGGER - NAV LOGO

ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 1280px)": function() {
    var logoCollapse = gsap.timeline({
      scrollTrigger: {
        trigger: ".jv-logo",
        scrub: true,
        start: "400px 20%",
        end: "+=80px",
        // id: "jv-logo",
        // markers: true
      }
    });
    
    logoCollapse.to('.logo-johnathan-mask', { duration:.4, width:'6px', x:-44, ease:Power2.easeOut })
      .to('.logo-valencia-mask', { duration:.4, width:'12px', x:-45, ease:Power2.easeOut }, 0)
      .to('.logo-end-mask', { duration:.4, x:-45, ease:Power2.easeOut }, 0);
  }
});


//////// SCROLL TRIGGER - BACKGROUND COLOR

ScrollTrigger.matchMedia({
  
  // desktop
  "(min-width: 1280px)": function() {
    var mainBackgroundSETF = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-case-study-receptiv .receptiv",
        scrub: true,
        start: "top 80%",
        end: "center center"
        // id: "backgrounds",
        // markers: true
      }
    });
    mainBackgroundSETF.fromTo('main', { background:'rgb(205, 230, 255, 0)' }, { background:'rgb(205, 230, 255, .22)' });
    
    var mainBackgroundReceptiv = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-case-study-setf .case-study__client",
        scrub: true,
        start: "top 64%",
        end: "center center"
        // id: "backgrounds",
        // markers: true
      }
    });
    mainBackgroundReceptiv.to('main', { background:'rgb(243, 222, 255, .16)' });

    var caseStudyDevice = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-case-study-receptiv",
        scrub: true,
        pin: ".case-study__asset"
        // id: "device-mobile",
        // markers: true
      }
    });
    
    caseStudyDevice.to(".receptiv__device .setf-poster-2",  .4, { delay:.4, autoAlpha:1 })
      .to(".receptiv__dot", { background:'#F3DEFF' }, 2)
      .to(".receptiv__device", { duration:.8, width:'375px', height:'654px', borderRadius:'22px', overflow:'hidden' }, 2)
      .to(".receptiv-video-wrapper", { autoAlpha:1 }, 2)
      .fromTo(".receptiv-video-wrapper #receptivideo", { scale:2 }, { scale:1 }, 2)
      .to(".receptiv__device .setf-poster-1", { autoAlpha:0 }, 2.4)
      .to(".receptiv__device .setf-poster-2", { autoAlpha:0 }, 2.4)
      .to(".receptiv__dot", { background:'#F3DEFF' }, 4);

      //////// SCROLL TRIGGER - RECEPTIV

    var receptivPublishers = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-case-study-setf",
        scrub: true,
        start: "top 40%",
        end: "center center",
        // id: "publishers",
        // markers: true
      }
    });

    receptivPublishers.to('.publisher__twodots', { x:-252, y: -160 })
      .to('.publisher__myboo', { x:-300 }, 0)
      .to('.publisher__sonic', { x:-252, y: 160 }, 0)
      .to('.publisher__ruzzle', { x:252, y: -160 }, 0)
      .to('.publisher__flick', { x:300 }, 0)
      .to('.publisher__buggy', { x:252, y: 160 }, 0);

    const videos = gsap.utils.toArray('video');
    videos.forEach(function(video, i) {
      ScrollTrigger.create({
        trigger: video,
        start: 'top center',
        end: 'bottom center',
        // markers: true,
        onEnter: () => video.play(),
        onEnterBack: () => video.play(),
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
      });
    });

    var mainBackgroundCapabilities = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-capabilities",
        scrub: true,
        start: "top 80%",
        end: "center center"
        // id: "backgrounds",
        // markers: true
      }
    });
    mainBackgroundCapabilities.to('main', { background:'rgb(255, 255, 255, 1)' });

    gsap.to(".section-capabilities", {
      scrollTrigger: {
        trigger: ".section-capabilities",
        start: "top 24%", // the default values
        end: "bottom 40%",
        // scrub: true
        onEnter: cursorLaptop,
        onLeave: removeCursorLaptop,
        onEnterBack: cursorLaptop,
        onLeaveBack: removeCursorLaptop
        // id: "cursor-change",
        // markers: true
      }, 
    });

    gsap.to(".section-collaboration .collaboration .info", {
      yPercent: 44,
      ease: "none",
      scrollTrigger: {
        trigger: ".collaboration .info",
        start: "top 24%", // the default values
        // end: "bottom top",
        scrub: true
        // id: "collaboration",
        // markers: true
      }, 
    });

  }
});


//////// CAPABILITY HOVER & SWITCH

function capabilityHover(item) {
  capabilitiesShowroom.pause();
  gsap.set('.three-split .list .list-border', { width:'0%' });
  var gifAsset;
  gifAsset = d.getElementById('gifAsset');
  if (item === 'research'){
    gifAsset.style.background = 'url(app/creative/gifs/user-research.gif) no-repeat';
  } else if (item === 'strategy'){
    gifAsset.style.background = 'url(app/creative/gifs/product-strategy-3.gif) no-repeat';
  } else if (item === 'ux'){
    gifAsset.style.background = 'url(app/creative/gifs/ux-ui-design.gif) no-repeat';
  } else if (item === 'design'){
    gifAsset.style.background = 'url(app/creative/gifs/product-design-3.gif) no-repeat';
  } else if (item === 'usertesting'){
    gifAsset.style.background = 'url(app/creative/gifs/user-testing.gif) no-repeat';
  } else if (item === 'prototyping'){
    gifAsset.style.background = 'url(app/creative/gifs/rapid-prototyping-2.gif) no-repeat';
  } else if (item === 'dev'){
    gifAsset.style.background = 'url(app/creative/gifs/front-end-dev.gif) no-repeat';
  } else if (item === 'animation'){
    gifAsset.style.background = 'url(app/creative/gifs/ui-animation-3.gif) no-repeat';
  } else if (item === 'interaction'){
    gifAsset.style.background = 'url(app/creative/gifs/micro-interaction-3.gif) no-repeat';
  } else if (item === 'abtesting'){
    gifAsset.style.background = 'url(app/creative/gifs/ab-testing.gif) no-repeat';
  } 
  gifAsset.style.backgroundSize = 'contain';
  gifAsset.style.width = '100%';
  gifAsset.style.height = '100%';
  var xNumber = randomNumber(-320,320);
  var yNumber = randomNumber(-320,320);
  var rotationNumber = randomNumber(-180,180);
  gsap.fromTo('#gifAsset', { autoAlpha:0, x:xNumber, y:yNumber, rotation:rotationNumber }, { duration:.6, autoAlpha:1, x:0, y:0, rotation:0, ease:Expo.easeOut });
}

function capabilitySwitch(item) {
  var gifAsset;
  gifAsset = d.getElementById('gifAsset');
  if (item === 'research'){
    gifAsset.style.background = 'url(app/creative/gifs/user-research.gif) no-repeat';
  } else if (item === 'strategy'){
    gifAsset.style.background = 'url(app/creative/gifs/product-strategy-3.gif) no-repeat';
  } else if (item === 'ux'){
    gifAsset.style.background = 'url(app/creative/gifs/ux-ui-design.gif) no-repeat';
  } else if (item === 'design'){
    gifAsset.style.background = 'url(app/creative/gifs/product-design-3.gif) no-repeat';
  } else if (item === 'usertesting'){
    gifAsset.style.background = 'url(app/creative/gifs/user-testing.gif) no-repeat';
  } else if (item === 'prototyping'){
    gifAsset.style.background = 'url(app/creative/gifs/rapid-prototyping-2.gif) no-repeat';
  } else if (item === 'dev'){
    gifAsset.style.background = 'url(app/creative/gifs/front-end-dev.gif) no-repeat';
  } else if (item === 'animation'){
    gifAsset.style.background = 'url(app/creative/gifs/ui-animation-3.gif) no-repeat';
  } else if (item === 'interaction'){
    gifAsset.style.background = 'url(app/creative/gifs/micro-interaction-3.gif) no-repeat';
  } else if (item === 'abtesting'){
    gifAsset.style.background = 'url(app/creative/gifs/ab-testing.gif) no-repeat';
  } 
  gifAsset.style.backgroundSize = 'contain';
  gifAsset.style.width = '100%';
  gifAsset.style.height = '100%';
  gsap.fromTo('#gifAsset', { autoAlpha:0 }, { duration:.2, autoAlpha:1, ease:Expo.easeOut });
}

function randomNumber(min, max) {  
  return Math.random() * (max - min) + min; 
} 

function removeCapabilityGif() {
  var gifAsset = d.getElementById('gifAsset');
  gifAsset.style.background = 'none';
}

var capabilitiesShowroom = gsap.timeline({ ease:'none',
  scrollTrigger: {
    trigger: ".capabilities .three-split",
    start: 'top 40%'
    // id: "capabilities",
    // markers: true
  }
});

capabilitiesShowroom.to('.capabilities .three-split:nth-child(2) .list .list-item:nth-child(1) .list-border', { delay:.2, duration: 3, width:'100%', onStart:function() {
  capabilitySwitch('design');
} })
.to('.capabilities .three-split:nth-child(2) .list .list-item:nth-child(1) .list-border', { duration: .2, autoAlpha:0 })
.to('.capabilities .three-split:nth-child(2) .list .list-item:nth-child(2) .list-border', { duration: 3, width:'100%', onStart:function() {
  capabilitySwitch('strategy');
} }, '-=.2')
.to('.capabilities .three-split:nth-child(2) .list .list-item:nth-child(2) .list-border', { duration: .2, autoAlpha:0 })
.to('.capabilities .three-split:nth-child(2) .list .list-item:nth-child(3) .list-border', { duration: 3, width:'100%', onStart:function() {
  capabilitySwitch('ux');
} }, '-=.2')
.to('.capabilities .three-split:nth-child(2) .list .list-item:nth-child(3) .list-border', { duration: .2, autoAlpha:0 })
.to('.capabilities .three-split:nth-child(2) .list .list-item:nth-child(4) .list-border', { duration: 3, width:'100%', onStart:function() {
  capabilitySwitch('research');
} }, '-=.2')
.to('.capabilities .three-split:nth-child(2) .list .list-item:nth-child(4) .list-border', { duration: .2, autoAlpha:0 })
.to('.capabilities .three-split:nth-child(2) .list .list-item:nth-child(5) .list-border', { duration: 3, width:'100%', onStart:function() {
  capabilitySwitch('usertesting');
} }, '-=.2')
.to('.capabilities .three-split:nth-child(2) .list .list-item:nth-child(5) .list-border', { duration: .2, autoAlpha:0 })
.to('.capabilities .three-split:nth-child(3) .list .list-item:nth-child(1) .list-border', { delay:.2, duration: 3, width:'100%', onStart:function() {
  capabilitySwitch('prototyping');
} })
.to('.capabilities .three-split:nth-child(3) .list .list-item:nth-child(1) .list-border', { duration: .2, autoAlpha:0 })
.to('.capabilities .three-split:nth-child(3) .list .list-item:nth-child(2) .list-border', { duration: 3, width:'100%', onStart:function() {
  capabilitySwitch('dev');
} }, '-=.2')
.to('.capabilities .three-split:nth-child(3) .list .list-item:nth-child(2) .list-border', { duration: .2, autoAlpha:0 })
.to('.capabilities .three-split:nth-child(3) .list .list-item:nth-child(3) .list-border', { duration: 3, width:'100%', onStart:function() {
  capabilitySwitch('animation');
} }, '-=.2')
.to('.capabilities .three-split:nth-child(3) .list .list-item:nth-child(3) .list-border', { duration: .2, autoAlpha:0 })
.to('.capabilities .three-split:nth-child(3) .list .list-item:nth-child(4) .list-border', { duration: 3, width:'100%', onStart:function() {
  capabilitySwitch('interaction');
} }, '-=.2')
.to('.capabilities .three-split:nth-child(3) .list .list-item:nth-child(4) .list-border', { duration: .2, autoAlpha:0 })
.to('.capabilities .three-split:nth-child(3) .list .list-item:nth-child(5) .list-border', { duration: 3, width:'100%', onStart:function() {
  capabilitySwitch('abtesting');
} }, '-=.2')
.to('.capabilities .three-split:nth-child(3) .list .list-item:nth-child(5) .list-border', { duration: .2, autoAlpha:0, onComplete:removeCapabilityGif });

////// Contact

ScrollTrigger.matchMedia({
  
  // desktop
  "(min-width: 1536px)": function() {
    gsap.from(".section-contact .contact-wrapper", {
      y: -200,
      ease: "none",
      scrollTrigger: {
        trigger: ".section-contact",
        start: "top 100%", // the default values
        end: "top 16%",
        scrub: true
        // id: "contact-area",
        // markers: true
      }, 
    });
  }, 
  
  // mobile
  "(max-width: 1535px)": function() {
    gsap.from(".section-contact .contact-wrapper", {
      y: -240,
      ease: "none",
      scrollTrigger: {
        trigger: ".section-contact",
        start: "top 100%", // the default values
        end: "top 16%",
        scrub: true
        // id: "contact-area",
        // markers: true
      }, 
    });
  }
  
});

function anchorTop(){
  gsap.to(window, {duration: 1.2, scrollTo:".full-height", ease:'expo.out', onStart:closeMenu});
}

function anchorCaseStudies(){
  ScrollTrigger.matchMedia({
    "(min-width: 1280px)": function() {
      gsap.to(window, {duration: 1.2, scrollTo:".section-case-study-receptiv", ease:'expo.out', onStart:closeMenu});
    }, 
    "(min-width: 768px) and (max-width: 1279px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-case-study-mobile', offsetY:160}, ease:'expo.out', onStart:closeMenu});
    },
    "(max-width: 767px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-case-study-mobile', offsetY:96}, ease:'expo.out', onStart:closeMenu});
    }
  });
}

function anchorCapabilities(){
  ScrollTrigger.matchMedia({
    "(min-width: 1440px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-capabilities', offsetY:72}, ease:'expo.out', onStart:closeMenu});
    }, 
    "(min-width: 1280px) and (max-width: 1439px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-capabilities', offsetY:24}, ease:'expo.out', onStart:closeMenu});
    },
    "(min-width: 1024px) and (max-width: 1279px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-capabilities', offsetY:-64}, ease:'expo.out', onStart:closeMenu});
    },
    "(max-width: 1023px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-capabilities', offsetY:32}, ease:'expo.out', onStart:closeMenu});
    }
  });
}

function anchorCharacter(){
  ScrollTrigger.matchMedia({
    "(min-width: 1440px)": function() {
      gsap.to(window, {duration: 1.2, scrollTo:".section-character", ease:'expo.out', onStart:closeMenu});
    }, 
    "(min-width: 1280px) and (max-width: 1439px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-character', offsetY:96}, ease:'expo.out', onStart:closeMenu});
    },
    "(max-width: 1279px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-character', offsetY:88}, ease:'expo.out', onStart:closeMenu});
    }
  });
}

function anchorCollaboration(){
  ScrollTrigger.matchMedia({
    "(min-width: 1440px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-collaboration', offsetY:-80}, ease:'expo.out', onStart:closeMenu});
    }, 
    "(min-width: 1280px) and (max-width: 1439px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-collaboration', offsetY:-120}, ease:'expo.out', onStart:closeMenu});
    },
    "(min-width: 768px) and (max-width: 1279px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-collaboration', offsetY:-80}, ease:'expo.out', onStart:closeMenu});
    },
    "(max-width: 767px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-collaboration', offsetY:8}, ease:'expo.out', onStart:closeMenu});
    }
  });
}

function anchorContact(){
  ScrollTrigger.matchMedia({
    "(min-width: 1280px)": function() {
      gsap.to(window, {duration: 1.2, scrollTo:".section-contact", ease:'expo.out', onStart:closeMenu});
    }, 
    "(max-width: 1279px)": function() {
      gsap.to(window, 1.2, {scrollTo:{y:'.section-contact', offsetY:65}, ease:'expo.out', onStart:closeMenu});
    }
  });
}

function initSETFcasestudy() {
  var url = 'setf-collections.html';
  window.open(url, "_blank");
}