var d = document,
    hamburger = true,
    menuClosed = true,
    page = 'work',
    workCaseStudies = d.getElementById('workCaseStudies'),
    workOverlay = d.getElementById('workOverlay'),
    imgWrapper = d.getElementById('imgWrapper'),
    videoWrapper = d.getElementById('videoWrapper'),
    vitasVideo = d.getElementById('vitasVideo');
    galleryWrapper = d.getElementById('galleryWrapper'),
    thmbWrapper = d.getElementById('thmbWrapper'),
    cta = d.getElementById('cta'),
    workTitle = d.getElementById('workTitle'),
    workDescription = d.getElementById('workDescription'),
    rolesList = d.getElementById('rolesList');

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
  gsap.fromTo(['.menu-items .projects', '.menu-items .contact'], 
    { perspective:800, transformStyle:"preserve-3d", transformOrigin:'top right', autoAlpha:0, y:100, rotationZ:90, rotationY:90, x:48 }, { duration: .8, autoAlpha:1, rotationZ:0, y:0, rotationY:0, x:0, stagger: .05, ease:Expo.easeOut }
  );
}

function closeMenu() {
  gsap.to(['.menu-items .contact', '.menu-items .projects'], 
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
        start: "240px 20%",
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

function openCaseStudy(item) {
  if (item === 'setf-collections') {
    window.open('setf-collections.html', '_self')
  }
}

function initWork(item) {
  workCaseStudies.style.display = 'none';
  gsap.set('.page-work section', { height:'100vh' });
  workOverlay.style.display = 'flex';
  gsap.fromTo('#workOverlay', { autoAlpha:0 }, { duration:.4, autoAlpha:1, ease:'expo.out' });
  gsap.fromTo('.work-wrapper', { autoAlpha:0, scale:.96, y:120 }, { duration:.8, autoAlpha:1, scale:1, y:0, ease:'expo.out' });
  if (item === 'receptiv'){
    imgWrapper.style.display = 'block';
    galleryWrapper.style.display = 'flex';
    imgWrapper.innerHTML = '<img src="app/creative/work/work-receptiv-dell.png" width="100%" height="auto">';
    thmbWrapper.innerHTML = '<li id="imgReceptivthmb1" onclick="galleryReceptiv(\'img1\')"> <img src="app/creative/work/receptiv-img-1.png" width="100%" height="auto"> </li> <li id="imgReceptivthmb2" onclick="galleryReceptiv(\'img2\')"> <img src="app/creative/work/receptiv-img-2.png" width="100%" height="auto"> </li> <li id="imgReceptivthmb3" onclick="galleryReceptiv(\'img3\')"> <img src="app/creative/work/receptiv-img-3.png" width="100%" height="auto"> </li> <li id="imgReceptivthmb4" onclick="galleryReceptiv(\'img4\')"> <img src="app/creative/work/receptiv-img-4.png" width="100%" height="auto"> </li> <li id="imgReceptivthmb5" onclick="galleryReceptiv(\'img5\')"> <img src="app/creative/work/receptiv-img-5.png" width="100%" height="auto"> </li>';
    workTitle.innerHTML = 'Putting human experience at the center of digital advertising';
    workDescription.innerHTML = 'Receptiv was a reward based mobile video in-app advertising company. Their platform was engineered to understand human emotion and build a real-time ad experience that reacts to each unique user delivering context.<br><br>That combination made for an immersive and engaging brand-to-human experience. With over 1,300 SDK App Integrations, Receptiv increased ad performance by 300%<br><br>With Receptiv\'s technology and behavioral & predictive data, I succeeded in shaping their flagship products to put people first.<br><br>As employee #28, I quickly evolved their existing solutions, built and launched new high-impact products that generated over $68 million a year.';
    rolesList.innerHTML = '<li>Creative Direction</li> <li>Innovation</li> <li>Management</li>';
  }
  if (item === 'roulette'){
    imgWrapper.style.display = 'block';
    imgWrapper.innerHTML = '<img src="app/creative/work/work-roulette.png" width="100%" height="auto">';
    workTitle.innerHTML = 'Don\'t know what to watch?';
    workDescription.innerHTML = 'With so much great television content out there, indecision is sometimes inevitable. Ever have late nights where you just want to sit back and not have to worry about what to watch next?<br><br>The TV Roulette App will enable consumers to quickly find an episode from TV they love - Easily, Quickly, Delightfully.';
    rolesList.innerHTML = '<li>Research</li> <li>Content Strategy</li> <li>User Experience</li> <li>UI Design</li> <li>UI Animation</li> <li>HTML Prototype</li>';
  }
  if (item === 'setf-lease-end'){
    iframeWrapper.style.display = 'block';
    iframeWrapper.innerHTML = '<iframe src="app/creative/work/setf-lease-end-experience/index.html" height="800px" width="100%" style="border:none;"></iframe>';
    workTitle.innerHTML = 'Lease turn in made easy';
    workDescription.innerHTML = 'This solution is to provide Southease Toyota Finance lease customers a complete and clear understanding of the options, processes, considerations, and related implications associated with ending a lease.<br><br>Not every lease-end journey is the same. The customer will either turn in the vehicle, extend their current lease, or purchase the vehicle. The solution clearly communicated the lease-end process to prepare customers for a smooth lease-end transition.<br><br>This also gave the opportunity for SETF to capture analytics about lease-end customers,  drive new lease opportunites to dealers, and retain existing customers.';
    rolesList.innerHTML = '<li>Research</li> <li>Content Strategy</li> <li>User Experience</li> <li>UI Design</li> <li>UI Animation</li> <li>HTML Prototype</li>';
  }
  if (item === 'setf-cws'){
    imgWrapper.style.display = 'block';
    galleryWrapper.style.display = 'flex';
    cta.style.display = 'block';
    imgWrapper.innerHTML = '<img src="app/creative/work/work-setf-cws-process.png" width="100%" height="auto">';
    thmbWrapper.innerHTML = '<li id="imgSETFthmb1" onclick="gallerySETF(\'img1\')"> <img src="app/creative/work/setf-cws-img-1.png" width="100%" height="auto"> </li> <li id="imgSETFthmb2" onclick="gallerySETF(\'img2\')"> <img src="app/creative/work/setf-cws-img-2.png" width="100%" height="auto"> </li> <li id="imgSETFthmb3" onclick="gallerySETF(\'img3\')"> <img src="app/creative/work/setf-cws-img-3.png" width="100%" height="auto"> </li>';
    cta.innerHTML = '<a href="https://www.setf.com/" target="_blank">Launch Website</a>'
    workTitle.innerHTML = 'Customer Website Redesign';
    workDescription.innerHTML = 'Southeast Toyota Finance services (SETF) original website significantly limited SETF\'s ability to control the presentation of content and while SETF ranks highly for consumer financing satisfaction, its website didn\'t positively extend or enhance the brand, was payment-focused, and offered little value-added content - providing no reason to stay - let alone stay in the driver\'s seat of a Toyota at the end-of-lease or once their last payment was made.<br><br>In collaboration with SETF, we evolved its payment-focused website into an award winning platform to create deeper and longer-lasting relationships with its customers and improve customer retention while minimizing the impact on their existing processes and technologies.';
    rolesList.innerHTML = '<li>Research</li> <li>Content Strategy</li> <li>Information Architecture</li> <li>User Experience</li> <li>UI Design</li> <li>Prototype</li>';
  }
  if (item === 'vitas-acep'){
    videoWrapper.style.display = 'block';
    var vitasVid = '../app/creative/work/work-vitas-acep';
    addSourceToVideo(vitasVideo, vitasVid+'.mp4', 'video/mp4');
    workTitle.innerHTML = 'VITAS Healthcare Billboard';
    workDescription.innerHTML = 'I was tasked to execute a video for VITAS Healthcare that would engage a moving audience during an ACEP Conference. The video needed to capture the essence of the brand and express exactly what they wanted the audience to understand about their service.<br><br>Animation was the key factor that was proven effective in creating this billboard that communicated clearly and quickly the information in an interesting, creative and memorable way.';
    rolesList.innerHTML = '<li>Visual Design</li> <li>Animation</li>';
  }
}

function closeOverlay() {
  workOverlay.style.display = 'none';
  imgWrapper.style.display = 'none';
  videoWrapper.style.display = 'none';
  galleryWrapper.style.display = 'none';
  iframeWrapper.style.display = 'none';
  workCaseStudies.style.display = 'block';
  gsap.set('.page-work section', { height:'auto' });
  imgWrapper.innerHTML = '';
  vitasVideo.innerHTML = '';
  thmbWrapper.innerHTML = '';
  iframeWrapper.innerHTML = '';
  workTitle.innerHTML = '';
  workDescription.innerHTML = '';
  cta.innerHTML = '';
  rolesList.innerHTML = '';
}

function addSourceToVideo(element, src, type) {
  var source = document.createElement('source');
  source.src = src;
  source.type = type;
  element.appendChild(source);
}

function gallerySETF(item) { 
  if (item === 'img1') {
    imgWrapper.innerHTML = '<img src="app/creative/work/work-setf-cws-process.png" width="100%" height="auto">';
    gsap.to('#imgSETFthmb1', { duration:.4, border: '2px solid #40ACE4', ease:'expo.out' });
    gsap.to('#imgSETFthmb2', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgSETFthmb3', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
  }
  if (item === 'img2') {
    imgWrapper.innerHTML = '<img src="app/creative/work/work-setf-cws-unauthenticated.png" width="100%" height="auto">';
    gsap.to('#imgSETFthmb1', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgSETFthmb2', { duration:.4, border: '2px solid #40ACE4', ease:'expo.out' });
    gsap.to('#imgSETFthmb3', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
  }
  if (item === 'img3') {
    imgWrapper.innerHTML = '<img src="app/creative/work/work-setf-cws-authenticated.png" width="100%" height="auto">';
    gsap.to('#imgSETFthmb1', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgSETFthmb2', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgSETFthmb3', { duration:.4, border: '2px solid #40ACE4', ease:'expo.out' });
  }
}

function galleryReceptiv(item) { 
  if (item === 'img1') {
    imgWrapper.innerHTML = '<img src="app/creative/work/work-receptiv-dell.png" width="100%" height="auto">';
    gsap.to('#imgReceptivthmb1', { duration:.4, border: '2px solid #40ACE4', ease:'expo.out' });
    gsap.to('#imgReceptivthmb2', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb3', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb4', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb5', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
  }
  if (item === 'img2') {
    imgWrapper.innerHTML = '<img src="app/creative/work/work-receptiv-chipotle.png" width="100%" height="auto">';
    gsap.to('#imgReceptivthmb1', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb2', { duration:.4, border: '2px solid #40ACE4', ease:'expo.out' });
    gsap.to('#imgReceptivthmb3', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb4', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb5', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
  }
  if (item === 'img3') {
    imgWrapper.innerHTML = '<img src="app/creative/work/work-receptiv-twix.png" width="100%" height="auto">';
    gsap.to('#imgReceptivthmb1', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb2', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb3', { duration:.4, border: '2px solid #40ACE4', ease:'expo.out' });
    gsap.to('#imgReceptivthmb4', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb5', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
  }
  if (item === 'img4') {
    imgWrapper.innerHTML = '<img src="app/creative/work/work-receptiv-cider.png" width="100%" height="auto">';
    gsap.to('#imgReceptivthmb1', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb2', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb3', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb4', { duration:.4, border: '2px solid #40ACE4', ease:'expo.out' });
    gsap.to('#imgReceptivthmb5', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
  }
  if (item === 'img5') {
    imgWrapper.innerHTML = '<img src="app/creative/work/work-receptiv-dole.png" width="100%" height="auto">';
    gsap.to('#imgReceptivthmb1', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb2', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb3', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb4', { duration:.2, border: '2px solid #E8ECF1', ease:'expo.out' });
    gsap.to('#imgReceptivthmb5', { duration:.4, border: '2px solid #40ACE4', ease:'expo.out' });
  }
}

function initHome() {
  var url = 'index.html';
  window.open(url, "_self");
}

function openProjects() {
  var url = 'projects.html';
  window.open(url, "_self");
}

function gotoContact(){
  var url = 'index.html?portfolio=johnathan';
  window.open(url, "_self");
}

function animateFrom(elem, direction) {
  ScrollTrigger.matchMedia({
    "(max-width: 439px)": function() {
      direction = direction || 1;
      var x = 0,
          y = direction * 40;
      elem.style.transform = "translate(" + x + "px, " + y + "px)";
      elem.style.opacity = "0";
      gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 1.25, 
        x: 0,
        y: 0, 
        autoAlpha: 1, 
        ease: "expo", 
        overwrite: "auto"
      });
    },
    "(min-width: 440px)": function() {
      direction = direction || 1;
      var x = 0,
          y = direction * 100;
      if(elem.classList.contains("gs_reveal_fromLeft")) {
        x = -100;
        y = direction * 50;
      } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 100;
        y = direction * 50;
      }
      elem.style.transform = "translate(" + x + "px, " + y + "px)";
      elem.style.opacity = "0";
      gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 1.25, 
        x: 0,
        y: 0, 
        autoAlpha: 1, 
        ease: "expo", 
        overwrite: "auto",
        delay:.2
      });
    }
  });
}

function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {

  gsap.set('.work_case-studies', { display:'block' });
  
  gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });
});