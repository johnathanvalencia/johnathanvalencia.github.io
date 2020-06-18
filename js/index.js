var d = document,
    hamburger = true,
    menuClosed = true,
    page = 'home',
    characterThem = document.getElementById("characterThem"),
    characterMe = document.getElementById("characterMe");

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
        checkMenuStatus();
        //console.log(page);	    
  		} else if(origin.anchor == 'capabilities' && direction =='up'){
        page = 'casestudy';
        checkMenuStatus();
        //console.log(page);
      }
      
      else if (origin.anchor == 'capabilities' && direction =='down'){
        page = 'character';
        checkMenuStatus();
        //console.log(page);
  		} else if(origin.anchor == 'character' && direction =='up'){
        page = 'capabilities';
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

  // gsap.fromTo('.wander', 1.5, { autoAlpha:0 }, { delay:.5, autoAlpha:.4, ease:Power1.easeOut });

  //initWander();

}

function initWander() {
  // $("#move").click(function() {
  //   if (wanderTween) {
  //     wanderTween.kill();
  //     wanderTween = null;
  //     gsap.to($box, {duration:0.5, x:0, y:0});
  //   } else {
  //     wander();
  //   }
  // });

  var $box = $(".wander"),
      $field = $(".background-wrapper");

  function wander() {
    var x = (($field.width() - $box.width()) / 2) * (Math.random() * 1.8 - 0.9),
        y = (($field.height() - $box.height()) / 2) * (Math.random() * 1.4 - 0.7);
    wanderTween = gsap.to($box, {duration: 5, x:x, y:y, ease:"power1.inOut", onComplete:wander});
  }
  
  setTimeout(function(){ wander() }, 2000);
  // wander();
  gsap.fromTo('.wander', .8, { autoAlpha:0 }, { delay:3, autoAlpha:1, ease:Power1.easeOut });
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
}

function menuHover() {
  if ( menuClosed == true ) {
    gsap.to('.menu .anchor', { duration:.2, x:29, width:'3px', height:'3px', ease:Expo.easeOut });
  }
}

function menuHoverOut() {
  if ( menuClosed == true ) {
    gsap.to('.menu .anchor', { duration:.2, x:0, width:'24px', height:'3px', ease:Expo.easeOut });
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
    { perspective:800, transformStyle:"preserve-3d", transformOrigin:'top right', autoAlpha:0, y:100, rotationZ:90, rotationY:90,  x:48 }, { duration: .8, autoAlpha:1, rotationZ:0, y:0, rotationY:0, x:0, stagger: .05, ease:Expo.easeOut }
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
}

function menuItemHover(item) {
  if ( item == 'introduction' ) {
    gsap.to('.menu-items .intro', { duration:.2, color: '#ffffff', background: '#40ACE4', boxShadow: '0 16px 32px -8px rgba(64,172,228,0.35)', ease:Expo.easeOut });
  } else if ( item == 'casestudies' ) {
    gsap.to('.menu-items .case-studies', { duration:.2, color: '#ffffff', background: '#40ACE4', boxShadow: '0 16px 32px -8px rgba(64,172,228,0.35)', ease:Expo.easeOut });
  } else if ( item == 'capabilities' ) {
    gsap.to('.menu-items .capabilities', { duration:.2, color: '#ffffff', background: '#40ACE4', boxShadow: '0 16px 32px -8px rgba(64,172,228,0.35)', ease:Expo.easeOut });
  } else if ( item == 'character' ) {
    gsap.to('.menu-items .character', { duration:.2, color: '#ffffff', background: '#40ACE4', boxShadow: '0 16px 32px -8px rgba(64,172,228,0.35)', ease:Expo.easeOut });
  } else if ( item == 'collaboration' ) {
    gsap.to('.menu-items .collaboration', { duration:.2, color: '#ffffff', background: '#40ACE4', boxShadow: '0 16px 32px -8px rgba(64,172,228,0.35)', ease:Expo.easeOut });
  } else if ( item == 'contact' ) {
    gsap.to('.menu-items .contact', { duration:.2, color: '#ffffff', background: '#40ACE4', boxShadow: '0 16px 32px -8px rgba(64,172,228,0.35)', ease:Expo.easeOut });
  }
}

function menuItemHoverOut(item) {
  if ( item == 'introduction' ) {
    gsap.to('.menu-items .intro', { duration:.2, color: '#1E242B', background: '#ffffff', boxShadow: '0 16px 32px -8px rgba(146,166,191,0.35)', ease:Expo.easeOut });
  } else if ( item == 'casestudies' ) {
    gsap.to('.menu-items .case-studies', { duration:.2, color: '#1E242B', background: '#ffffff', boxShadow: '0 16px 32px -8px rgba(146,166,191,0.35)', ease:Expo.easeOut });
  } else if ( item == 'capabilities' ) {
    gsap.to('.menu-items .capabilities', { duration:.2, color: '#1E242B', background: '#ffffff', boxShadow: '0 16px 32px -8px rgba(146,166,191,0.35)', ease:Expo.easeOut });
  } else if ( item == 'character' ) {
    gsap.to('.menu-items .character', { duration:.2, color: '#1E242B', background: '#ffffff', boxShadow: '0 16px 32px -8px rgba(146,166,191,0.35)', ease:Expo.easeOut });
  } else if ( item == 'collaboration' ) {
    gsap.to('.menu-items .collaboration', { duration:.2, color: '#1E242B', background: '#ffffff', boxShadow: '0 16px 32px -8px rgba(146,166,191,0.35)', ease:Expo.easeOut });
  } else if ( item == 'contact' ) {
    gsap.to('.menu-items .contact', { duration:.2, color: '#1E242B', background: '#ffffff', boxShadow: '0 16px 32px -8px rgba(146,166,191,0.35)', ease:Expo.easeOut });
  }
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
}

function showMe() { 
  characterThem.className = "tab not-selected";
  characterMe.className = "tab";
  tabOne.style.display = 'block';
  tabTwo.style.display = 'none';
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

function anchorCaseStudy() {
  window.location.href = '#case-study';
}