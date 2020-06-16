var d = document,
    hamburger = true,
    menuClosed = true,
    characterThem = document.getElementById("characterThem"),
    characterMe = document.getElementById("characterMe");

var myFullpage = new fullpage('#fullpage', {
    afterRender: function(){
  		var pluginContainer = this;
      // TweenLite.set('.hero-content', { opacity:'1' });
      gsap.set('.menu-items', { autoAlpha:0 });
    },
    licenseKey: "CA747434-6C3640A7-81881045-30C01CBB",
    anchors: ['introduction', 'case-study-receptiv', 'case-study-southeast-toyota-finance', 'capabilites', 'character', 'collaboration', 'contact'],
    sectionsColor: ['', '', '', '', '', ''],
    navigation: true,
    navigationPosition: 'right',
    // navigationTooltips: ['Close before you doze', 'Fire is getting faster', 'Make a 900&deg; difference', 'Take it down a notch', 'Good Morning America'],
    scrollOverflow: true,
    menu: '#hero',
    onLeave: function(origin, destination, direction){
  		var leavingSection = this;

      if (origin.anchor == 'introduction' && direction =='down'){
          logoCollapse();
  		} else if(origin.anchor == 'case-study-receptiv' && direction =='up'){
  			  logoExpand();
  		}

      // else if (origin.anchor == 'fire-is-getting-faster' && direction =='down'){
  		//     //console.log("leaving fire-is-getting-faster");
      //     TweenLite.to('.hero-bg-slide-2', .6, { autoAlpha:0, ease:Expo.easeOut });
      //     TweenLite.fromTo('.hero-bg-slide-3', .6, { display:'block', autoAlpha:0 }, { autoAlpha:1, ease:Expo.easeOut });
      //     TweenLite.fromTo('.img-slide-3', .7, { y:800 }, { delay:.1, y:0, ease:Power1.easeOut });
  		// } else if(origin.anchor == 'make-a-900-difference' && direction =='up'){
  		// 	  //console.log("leaving make-a-900-difference");
      //     TweenLite.to('.hero-bg-slide-3', .6, { autoAlpha:0, ease:Expo.easeOut });
      //     TweenLite.to('.hero-bg-slide-2', .6, { autoAlpha:1, ease:Expo.easeOut });
  		// }

      // else if (origin.anchor == 'make-a-900-difference' && direction =='down'){
  		//     //console.log("leaving make-a-900-difference");
      //     TweenLite.to('.hero-bg-slide-3', .6, { autoAlpha:0, ease:Expo.easeOut });
      //     TweenLite.fromTo('.hero-bg-slide-4', .6, { display:'block', autoAlpha:0 }, { autoAlpha:1, ease:Expo.easeOut });
      //     TweenLite.fromTo('.img-slide-4', .7, { y:800 }, { delay:.1, y:0, ease:Power1.easeOut });
  		// } else if(origin.anchor == 'take-it-down-a-notch' && direction =='up'){
  		// 	  //console.log("leaving take-it-down-a-notch");
      //     TweenLite.to('.hero-bg-slide-4', .6, { autoAlpha:0, ease:Expo.easeOut });
      //     TweenLite.to('.hero-bg-slide-3', .6, { autoAlpha:1, ease:Expo.easeOut });
  		// }

      // else if (origin.anchor == 'take-it-down-a-notch' && direction =='down'){
  		//     //console.log("leaving take-it-down-a-notch");
      //     TweenLite.to('.hero-bg-slide-4', .6, { autoAlpha:0, ease:Expo.easeOut });
      //     TweenLite.fromTo('.hero-bg-slide-5', .6, { display:'block', autoAlpha:0 }, { autoAlpha:1, ease:Expo.easeOut });
      //     TweenLite.fromTo('.img-slide-5', .7, { y:800 }, { delay:.1, y:0, ease:Power1.easeOut });
  		// } else if(origin.anchor == 'good-morning-america' && direction =='up'){
  		// 	  //console.log("leaving good-morning-america");
      //     TweenLite.to('.hero-bg-slide-5', .6, { autoAlpha:0, ease:Expo.easeOut });
      //     TweenLite.to('.hero-bg-slide-4', .6, { autoAlpha:1, ease:Expo.easeOut });
  		// }

  		// //after leaving section 3
  		// else if(origin.anchor == 'good-morning-america' && direction =='down'){
  		// 	//console.log("hide navigation");
      //   TweenLite.to('#fp-nav', .2, { autoAlpha:0 });
      //   TweenLite.to('.secondary-nav', .2, { delay:.4, background: 'rgba(255, 255, 255, 1)' });
      //   TweenLite.to('.secondary-nav .menu', .2, { delay:.4, color:'#191C23' });
      //   TweenLite.to('.hero-nav-items', .2, { autoAlpha:0 });
  		// }

  		// else if(origin.anchor == 'cbyd' && direction == 'up'){
  		// 	//console.log("show navigation");
      //   TweenLite.to('#fp-nav', .2, { autoAlpha:1 });
      //   TweenLite.to('.secondary-nav', .1, { background: 'rgba(255, 255, 255, 0)' });
      //   TweenLite.to('.secondary-nav .menu', .1, { color:'#ffffff' });
      //   TweenLite.to('.hero-nav-items', .2, { autoAlpha:1 });
  		// }
  	},
    afterLoad: function( section, origin, destination, direction){
  		var loadedSlide = this;

      // TweenLite.set(['.hero-bg-slide-2','.hero-bg-slide-3','.hero-bg-slide-4','.hero-bg-slide-5'], { display:'block' });

      // if(origin.anchor == 'close-before-you-doze'){
  		// 	TweenLite.to('.hero-bg-slide-1', .6, { autoAlpha:1, ease:Expo.easeOut });
      //   TweenLite.to(['.hero-bg-slide-2','.hero-bg-slide-3','.hero-bg-slide-4','.hero-bg-slide-5'], .6, { autoAlpha:0, ease:Expo.easeOut });
  		// } else if(origin.anchor == 'fire-is-getting-faster'){
  		// 	TweenLite.to('.hero-bg-slide-2', .6, { autoAlpha:1, ease:Expo.easeOut });
      //   TweenLite.to(['.hero-bg-slide-1','.hero-bg-slide-3','.hero-bg-slide-4','.hero-bg-slide-5'], .6, { autoAlpha:0, ease:Expo.easeOut });
      // } else if(origin.anchor == 'make-a-900-difference'){
  		// 	TweenLite.to('.hero-bg-slide-3', .6, { autoAlpha:1, ease:Expo.easeOut });
      //   TweenLite.to(['.hero-bg-slide-1','.hero-bg-slide-2','.hero-bg-slide-4','.hero-bg-slide-5'], .6, { autoAlpha:0, ease:Expo.easeOut });
      // } else if(origin.anchor == 'take-it-down-a-notch'){
  		// 	TweenLite.to('.hero-bg-slide-4', .6, { autoAlpha:1, ease:Expo.easeOut });
      //   TweenLite.to(['.hero-bg-slide-1','.hero-bg-slide-2','.hero-bg-slide-3','.hero-bg-slide-5'], .6, { autoAlpha:0, ease:Expo.easeOut });
      // } else if(origin.anchor == 'good-morning-america'){
  		// 	TweenLite.to('.hero-bg-slide-5', .6, { autoAlpha:1, ease:Expo.easeOut });
      //   TweenLite.to(['.hero-bg-slide-1','.hero-bg-slide-2','.hero-bg-slide-3','.hero-bg-slide-4'], .6, { autoAlpha:0, ease:Expo.easeOut });
  		// }
  	}
});

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
  gsap.to('.menu .anchor', { duration:.4, width:'3px', height:'24px', y:56.5, ease:Expo.easeOut, onComplete:function() {
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



// function skipHero() {
//   TweenLite.to('#fp-nav', .2, { autoAlpha:0 });
//   TweenLite.to('.secondary-nav', .2, { delay:.4, background: 'rgba(255, 255, 255, 1)' });
//   TweenLite.to('.secondary-nav .menu', .2, { delay:.4, color:'#191C23' });
//   TweenLite.to('.hero-nav-items', .2, { autoAlpha:0 });
//   window.location.href = '#cbyd';
// }

// function nextSlide() {
//   //console.log('click test');
//   fullpage_api.moveSectionDown();
// }
