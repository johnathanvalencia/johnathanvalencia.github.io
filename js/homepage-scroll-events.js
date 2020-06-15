// var cydController = new ScrollMagic.Controller({container: "#cyd-homeero"});

					// // build scene
					// var scene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: 200})
					// 	.addTo(cydController)
					// 	.setTween(TweenMax.to("#cyd-homeero .animated", 0.5, { backgroundColor: "green" }))
					// 	.addIndicators() // add indicators (requires plugin)
					// 	//.setPin("#cyd-homeero .animated");

// var tween = TweenLite.to('#cyd-homeero', 1.2, {scrollTo:"#heroSlide2", ease:Expo.easeOut});
// var tween = TweenMax.to(".move", 1.2, { x:800, ease: Power1.easeOut })
// var scene = new ScrollMagic.Scene({triggerElement: "#heroSlide2snapTop", triggerHook:1, offset: 200 })
//   .setTween(tween)
// 	.addIndicators({name: "move"}) // add indicators (requires plugin)
// 	.addTo(cydController);

// var controller = new ScrollMagic.Controller({
//   container: "#cyd-homeero"
// 	globalSceneOptions: {
// 		triggerHook: 'onLeave',
// 		duration: "200%" // this works just fine with duration 0 as well
// 		// However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
// 		// Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
// 	}
// });
//
// // get all slides
// var slides = document.querySelectorAll(".panel");
//
// // create scene for every slide
// for (var i=0; i<slides.length; i++) {
// 	new ScrollMagic.Scene({
// 			triggerElement: slides[i]
// 		})
// 		.setPin(slides[i], {pushFollowers: false})
// 		.addIndicators() // add indicators (requires plugin)
// 		.addTo(controller);
// }


//var tween = TweenMax.fromTo(".productivity-facts", 1.2, { autoAlpha:0, margin:'0 80px' }, { autoAlpha:1, margin:'0 40px', ease: Expo.easeInOut });
// var scene = new ScrollMagic.Scene({triggerElement: "#content-sm", triggerHook: .95, offset: 20, reverse: false})
//   .setTween(tween)
// 	//.addIndicators({name: "expand"}) // add indicators (requires plugin)
// 	.addTo(controller);
//
// var tween = TweenMax.fromTo(".clients-reveal", 1.2, { autoAlpha:0, margin:'0 120px' }, { autoAlpha:1, margin:'0 80px', ease: Expo.easeInOut });
// var scene = new ScrollMagic.Scene({triggerElement: "#content-xsm", triggerHook: .95, offset: 20, reverse: false})
//   .setTween(tween)
// 	//.addIndicators({name: "expand"}) // add indicators (requires plugin)
// 	.addTo(controller);
//
// var tween = TweenMax.staggerFromTo(".grid-solutions", 1.2, { autoAlpha:0, y:80 }, { autoAlpha:1, y:0, ease: Expo.easeInOut}, 0.1);
// var scene = new ScrollMagic.Scene({triggerElement: ".wrapper-solutions", triggerHook:.95, offset:138, reverse: false})
// 				.setTween(tween)
// 				//.addIndicators({name: "staggering"}) // add indicators (requires plugin)
// 				.addTo(controller);
//
// var tween = TweenMax.staggerFromTo(".content-card", 1.2, { autoAlpha:0, y:80 }, { autoAlpha:1, y:0, ease: Expo.easeInOut}, 0.1);
// var scene = new ScrollMagic.Scene({triggerElement: ".wrapper-sustainability", triggerHook:.95, offset:138, reverse: false})
// 				.setTween(tween)
// 				//.addIndicators({name: "staggering"}) // add indicators (requires plugin)
// 				.addTo(controller);
//
// var revealElements = document.getElementsByClassName("img-reveal");
// 	for (var i=0; i<revealElements.length; i++) { // create a scene for each element
// 		new ScrollMagic.Scene({
// 							triggerElement: revealElements[i], // y value not modified, so we can use element as trigger as well
// 							offset: 128,												 // start a little later
// 							triggerHook: 0.9,
//               reverse: false
// 						})
// 						.setClassToggle(revealElements[i], "img-full") // add class toggle
// 						//.addIndicators({name: "image " + (i+1) }) // add indicators (requires plugin)
// 						.addTo(controller);
// 	}
