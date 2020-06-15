var d = document;

var myFullpage = new fullpage('#fullpage', {
    afterRender: function(){
  		var pluginContainer = this;
  		// TweenLite.set('.hero-content', { opacity:'1' });
    },
    licenseKey: "CA747434-6C3640A7-81881045-30C01CBB",
    // paddingTop: '0px',
    anchors: ['introduction', 'fire-is-getting-faster', 'make-a-900-difference', 'take-it-down-a-notch', 'good-morning-america', 'cbyd'],
    sectionsColor: ['', '', '', '', '', '#ffffff'],
    navigation: true,
    navigationPosition: 'right',
    // navigationTooltips: ['Close before you doze', 'Fire is getting faster', 'Make a 900&deg; difference', 'Take it down a notch', 'Good Morning America'],
    scrollOverflow: true,
    menu: '#hero',
    onLeave: function(origin, destination, direction){
  		var leavingSection = this;

      // if (origin.anchor == 'close-before-you-doze' && direction =='down'){
  		//     //console.log("leaving close-before-you-doze");
      //     TweenLite.to('.hero-bg-slide-1', .6, { autoAlpha:0, ease:Expo.easeOut });
      //     TweenLite.fromTo('.hero-bg-slide-2', .6, { display:'block', autoAlpha:0 }, { autoAlpha:1, ease:Expo.easeOut });
      //     TweenLite.fromTo('.img-slide-2', .7, { y:800 }, { delay:.1, y:0, ease:Power1.easeOut });
  		// } else if(origin.anchor == 'fire-is-getting-faster' && direction =='up'){
  		// 	  //console.log("leaving fire-is-getting-faster");
      //     TweenLite.to('.hero-bg-slide-2', .6, { autoAlpha:0, ease:Expo.easeOut });
      //     TweenLite.to('.hero-bg-slide-1', .6, { autoAlpha:1, ease:Expo.easeOut });
  		// }

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
