var d = document,
    hamburger = true,
    menuClosed = true,
    page = 'home',
    characterThem = document.getElementById("characterThem"),
    characterMe = document.getElementById("characterMe");
    
gsap.set(["#logosSet2 img", "#logosSet3 img"], { autoAlpha:0, scale:0 });
arrowRight.style.opacity = "1";

var myFullpage = new fullpage('#fullpage', {
    afterRender: function(){
  		var pluginContainer = this;
      /*gsap.set('.hero-content', { opacity:'1' });*/
      gsap.set('.menu-items', { autoAlpha:0 });
      introAni();
    },
    licenseKey: "CA747434-6C3640A7-81881045-30C01CBB",
    anchors: ['introduction', 'case-study-receptiv', 'case-study-setf', 'capabilities', 'character', 'collaboration', 'contact'],
    /*sectionsColor: ['', '', '', '', '', ''],*/
    navigation: false,
    /*navigationPosition: 'right',*/
    scrollingSpeed: 800,
    scrollOverflow: true,
    menu: '#myMenu',
    onLeave: function(origin, destination, direction){
  		var leavingSection = this;
      if (origin.anchor == 'introduction' && direction =='down'){
          logoCollapse();
          page = 'casestudy';
          //console.log(page);
  		} else if(origin.anchor == 'case-study-receptiv' && direction =='up'){
          logoExpand();
          page = 'home';
          //console.log(page);
  		}

      else if (origin.anchor == 'case-study-receptiv' && direction =='down'){
        page = 'casestudy';
        checkMenuStatus();
        //console.log(page);
  		} else if(origin.anchor == 'case-study-setf' && direction =='up'){
        page = 'casestudy';  
        checkMenuStatus();
        //console.log(page);
      }
      
      else if (origin.anchor == 'case-study-setf' && direction =='down'){
        page = 'capabilities';
        cursorLaptop();
        checkMenuStatus();
        //console.log(page);	    
  		} else if(origin.anchor == 'capabilities' && direction =='up'){
        page = 'casestudy';
        removeCursorLaptop();
        checkMenuStatus();
        //console.log(page);
      }
      
      else if (origin.anchor == 'capabilities' && direction =='down'){
        page = 'character';
        removeCursorLaptop();
        checkMenuStatus();
        //console.log(page);
  		} else if(origin.anchor == 'character' && direction =='up'){
        page = 'capabilities';
        cursorLaptop();
        checkMenuStatus();
        //console.log(page);
      }
      
      else if (origin.anchor == 'character' && direction =='down'){
        page = 'collaboration';
        checkMenuStatus();
        //console.log(page);
  		} else if(origin.anchor == 'collaboration' && direction =='up'){
        page = 'character';
        checkMenuStatus();
        //console.log(page);
      }
      
      else if (origin.anchor == 'collaboration' && direction =='down'){
        page = 'contact';
        checkMenuStatus();
        //console.log(page);
  		} else if(origin.anchor == 'contact' && direction =='up'){
        page = 'collaboration';
        checkMenuStatus();
        //console.log(page);
  		}

  	},
    afterLoad: function( section, origin, destination, direction){
  		var loadedSlide = this;

      // TweenLite.set(['.hero-bg-slide-2','.hero-bg-slide-3','.hero-bg-slide-4','.hero-bg-slide-5'], { display:'block' });

      if(origin.anchor == 'introduction'){
        page = 'home';
        //console.log(page);
  		} else if(origin.anchor == 'case-study-receptiv'){
        page = 'casestudy';
        //console.log(page);
      } else if(origin.anchor == 'case-study-setf'){
        page = 'casestudy';
        //console.log(page);
      } else if(origin.anchor == 'capabilities'){
        page = 'capabilities';
        //console.log(page);
      } else if(origin.anchor == 'character'){
        page = 'character';
        //console.log(page);
  		} else if(origin.anchor == 'collaboration'){
        page = 'collaboration';
        collaborationLogosAni1();
        //console.log(page);
      } else if(origin.anchor == 'contact'){
        page = 'contact';
        //console.log(page);
  		}
  	}
});

function introAni() {
  gsap.fromTo('.ripple', 5, { autoAlpha:1, scale:.0 }, { delay:.1, autoAlpha:0, scale:4, ease:Power2.easeOut, onComplete:function() {
    TweenLite.set('.ripple', { background:'none', autoAlpha:0 });
  } });

  var $quote = $("#creative"),
    mySplitText = new SplitText($quote, {type:"words"}),
    splitTextTimeline = new TimelineLite();

  TweenLite.set($quote, {perspective:400}); 

  gsap.set('.hero-content', { delay:.2, opacity:'1' });

  mySplitText.split({type:"words"}) 
  $(mySplitText.words).each(function(index,el){
    splitTextTimeline.from($(el), 1.5, { delay:.3, opacity:0, force3D:true}, index * 0.01);
    splitTextTimeline.from($(el), 1.5, { delay:.3, scale:index % 1.5 == 0  ? 0 : 1.5, ease:Back.easeOut}, index * 0.01); 
  });

}

function logoCollapse() {
  gsap.to('.logo-johnathan-mask', { duration:.4, width:'6px', x:-44, ease:Expo.easeOut });
  gsap.to('.logo-valencia-mask', { duration:.4, width:'12px', x:-45, ease:Expo.easeOut });
  gsap.to('.logo-end-mask', { duration:.4, x:-45, ease:Expo.easeOut });
}

function logoExpand() {
  gsap.to('.logo-johnathan-mask', { delay:0.35, duration:.4, width:'107px', x:0, ease:Expo.easeOut });
  gsap.to('.logo-valencia-mask', { delay:0.35, duration:.4, width:'87px', x:0, ease:Expo.easeOut });
  gsap.to('.logo-end-mask', { delay:0.35, duration:.4, x:0, ease:Expo.easeOut });
}

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
  gsap.to('.menu .anchor', { duration:.4, width:'3px', height:'24px', x:29, y:56.5, ease:Expo.easeOut, onComplete:function() {
    hamburger = false;
  } });
  gsap.set('.menu-items', { autoAlpha:1 });
  gsap.fromTo(['.menu-items .intro', '.menu-items .case-studies', '.menu-items .capabilities', '.menu-items .character', '.menu-items .collaboration', '.menu-items .contact'], 
    { perspective:800, transformStyle:"preserve-3d", transformOrigin:'top right', autoAlpha:0, y:100, rotationZ:90, rotationY:90, x:48 }, { duration: .8, autoAlpha:1, rotationZ:0, y:0, rotationY:0, x:0, stagger: .05, ease:Expo.easeOut }
  );
}

function closeMenu() {
  gsap.to(['.menu-items .contact', '.menu-items .collaboration', '.menu-items .character', '.menu-items .capabilities', '.menu-items .case-studies', '.menu-items .intro'], 
    { duration: .4, autoAlpha:0, ease:Expo.easeOut }
  );
  gsap.set('.menu-items', { delay:.4, autoAlpha:0 });
  gsap.to('.menu .anchor', { duration:.4, width:'3px', height:'3px', y:0, ease:Expo.easeOut });
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

function anchorCaseStudy() {
  window.location.href = '#case-study';
}

function capabilityHover(item) {
  var gifAsset;
  gifAsset = d.getElementById('gifAsset');
  if (item === 'research'){
    gifAsset.style.background = 'url(creative/gifs/user-research.gif) no-repeat';
  } else if (item === 'strategy'){
    gifAsset.style.background = 'url(creative/gifs/product-strategy-3.gif) no-repeat';
  } else if (item === 'ux'){
    gifAsset.style.background = 'url(creative/gifs/ux-ui-design.gif) no-repeat';
  } else if (item === 'design'){
    gifAsset.style.background = 'url(creative/gifs/product-design-3.gif) no-repeat';
  } else if (item === 'usertesting'){
    gifAsset.style.background = 'url(creative/gifs/user-testing.gif) no-repeat';
  } else if (item === 'prototyping'){
    gifAsset.style.background = 'url(creative/gifs/rapid-prototyping-2.gif) no-repeat';
  } else if (item === 'dev'){
    gifAsset.style.background = 'url(creative/gifs/front-end-dev.gif) no-repeat';
  } else if (item === 'animation'){
    gifAsset.style.background = 'url(creative/gifs/ui-animation-3.gif) no-repeat';
  } else if (item === 'interaction'){
    gifAsset.style.background = 'url(creative/gifs/micro-interaction.gif) no-repeat';
  } else if (item === 'abtesting'){
    gifAsset.style.background = 'url(creative/gifs/ab-testing.gif) no-repeat';
  } 
  gifAsset.style.backgroundSize = 'contain';
  gifAsset.style.width = '100%';
  gifAsset.style.height = '100%';
  var xNumber = randomNumber(-320,320);
  var yNumber = randomNumber(-320,320);
  var rotationNumber = randomNumber(-180,180);
  gsap.fromTo('#gifAsset', { autoAlpha:0, x:xNumber, y:yNumber, rotation:rotationNumber }, { duration:.4, autoAlpha:1, x:0, y:0, rotation:0, ease:Expo.easeOut });
}

function randomNumber(min, max) {  
  return Math.random() * (max - min) + min; 
} 

function removeCapabilityGif() {
  var gifAsset = d.getElementById('gifAsset');
  gifAsset.style.background = 'none';
}

// function intro() {
// 	var tl = gsap.timeline();
// 	//...add animations here...
// 	return tl;
// }

// function middle() {
// 	var tl = gsap.timeline();
// 	//...add animations here...
// 	return tl;
// }

// function conclusion() {
// 	var tl = gsap.timeline();
// 	//...add animations here...
// 	return tl;
// }

// // stitch them together in a master timeline...
// var master = gsap.timeline();
// master.add(intro())
//       .add(middle(), "+=2")     //with a gap of 2 seconds
//       .add(conclusion(), "-=1") //overlap by 1 second

// Cursor Functions
function collaborationLogosAni1() { 
  tl = gsap.timeline({defaults: {duration: 1, ease: "expo.out"}, repeat: -1, paused:true});
    tl.to("#logosSet1 img", { duration: 1, autoAlpha:0, scale: 0, ease: "expo.out", stagger: { grid: "auto", from: "start", amount: .4 } }, 2)
    tl.to("#logosSet2 img", { duration: 1, autoAlpha:1, scale: 1, ease: "expo.out", stagger: { grid: "auto", from: "start", amount: .4 } }, 2)
    tl.to("#logosSet2 img", { duration: 1, autoAlpha:0, scale: 0, ease: "expo.out", stagger: { grid: "auto", from: "start", amount: .4 } }, 4)
    tl.to("#logosSet3 img", { duration: 1, autoAlpha:1, scale: 1, ease: "expo.out", stagger: { grid: "auto", from: "start", amount: .4 } }, 4)
    tl.to("#logosSet3 img", { duration: 1, autoAlpha:0, scale: 0, ease: "expo.out", stagger: { grid: "auto", from: "start", amount: .4 } }, 6)
    tl.to("#logosSet1 img", { duration: 1, autoAlpha:1, scale: 1, ease: "expo.out", stagger: { grid: "auto", from: "start", amount: .4 } }, 6);
}

var cursor = {
  delay: 6,
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

function cursorArrowRight() {
  var element, name, arr;
  element = document.getElementById("cursorAsset");
  name = "cursor-arrow-right";
  arr = element.className.split(" ");
  if (arr.indexOf(name) == -1) {
    element.className += " " + name;
  }
}

function removeCursorArrowRight() {
  element = document.getElementById("cursorAsset");
  element.className = element.className.replace(/\bcursor-arrow-right\b/g, "");
}

function cursorEye() {
  var element, name, arr;
  element = document.getElementById("cursorAsset");
  name = "cursor-eye";
  arr = element.className.split(" ");
  if (arr.indexOf(name) == -1) {
    element.className += " " + name;
  }
}

function removeCursorEye() {
  element = document.getElementById("cursorAsset");
  element.className = element.className.replace(/\bcursor-eye\b/g, "");
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
  element = document.getElementById("cursorAsset");
  name = "cursor-hide";
  arr = element.className.split(" ");
  if (arr.indexOf(name) == -1) {
    element.className += " " + name;
  }
}

function cursorShow() {
  element = document.getElementById("cursorAsset");
  element.className = element.className.replace(/\bcursor-hide\b/g, "");
}