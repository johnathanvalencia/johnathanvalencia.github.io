gsap.registerPlugin(ScrollTrigger);

var d = document;

/**** CONTENT CARD REVEAL ****/

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
  gsap.registerPlugin(ScrollTrigger);
  
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

/**** ARROW RIGHT REVEAL ****/

function animateArrowRight(elemArrow) {
  gsap.to(elemArrow, { duration:0, autoAlpha:1 });
  gsap.fromTo("#arrowRightMask", { drawSVG:"100% 0%" }, { duration:2, drawSVG:"100% 100%", ease:'power2.out' });
  if(elemArrow.classList.contains("arrow_reveal_arrow1")) {
    gsap.fromTo("#chevronRight", { rotate:-40 }, { duration:1.9, rotate:0, motionPath:{path:".arrow-right-1", align:".arrow-right-1", autoRotate: false, alignOrigin: [0.5, 0.5]}, ease:'power2.out' });
  } else if(elemArrow.classList.contains("arrow_reveal_arrow3")) {
    gsap.fromTo("#chevronRight3", { rotate:-40 }, { duration:1.9, rotate:0, motionPath:{path:".arrow-right-3", align:".arrow-right-3", autoRotate: false, alignOrigin: [0.5, 0.5]}, ease:'power2.out' });
  } else if(elemArrow.classList.contains("arrow_reveal_arrow5")) {
    gsap.fromTo("#chevronRight5", { rotate:-40 }, { duration:1.9, rotate:0, motionPath:{path:".arrow-right-5", align:".arrow-right-5", autoRotate: false, alignOrigin: [0.5, 0.5]}, ease:'power2.out' });
  } 
}

function hide(elemArrow) {
  gsap.set(elemArrow, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {
  
  gsap.utils.toArray(".arrow_reveal").forEach(function(elemArrow) {
    hide(elemArrow); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elemArrow,
      onEnter: function() { animateArrowRight(elemArrow) }
    });
  });
});

/**** ARROW LEFT REVEAL ****/

function animateArrowLeft(elemArrowLeft) {
  gsap.to(elemArrowLeft, { duration:0, autoAlpha:1 });
  gsap.fromTo("#arrowLeftMask", { drawSVG:"100% 0%" }, { duration:2, drawSVG:"100% 100%", ease:'power2.out' });
  if(elemArrowLeft.classList.contains("arrow_reveal_arrow2")) {
    gsap.fromTo("#chevronLeft2", { rotate:40 }, { duration:1.9, rotate:0, motionPath:{path:".arrow-left-2", align:".arrow-left-2", autoRotate: false, alignOrigin: [0.5, 0.5]}, ease:'power2.out' });
  } else if(elemArrowLeft.classList.contains("arrow_reveal_arrow4")) {
    gsap.fromTo("#chevronLeft4", { rotate:40 }, { duration:1.9, rotate:0, motionPath:{path:".arrow-left-4", align:".arrow-left-4", autoRotate: false, alignOrigin: [0.5, 0.5]}, ease:'power2.out' });
  } 
}

function hide(elemArrowLeft) {
  gsap.set(elemArrowLeft, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {
  
  gsap.utils.toArray(".arrow_reveal-left").forEach(function(elemArrowLeft) {
    hide(elemArrowLeft); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elemArrowLeft,
      onEnter: function() { animateArrowLeft(elemArrowLeft) }
    });
  });
});

/**** RELATED CONTENT ****/

ScrollTrigger.matchMedia({
  "(min-width: 440px)": function() {
    gsap.set(".cards_related .card", { y: 80 });
    ScrollTrigger.batch(".cards_related .card", {
      interval: 0.1, // time window (in seconds) for batching to occur. 
      batchMax: 3,   // maximum batch size (targets)
      onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.1, grid: [1, 3]}, overwrite: true, ease:'power3.out'}),
      onLeave: batch => gsap.set(batch, {opacity: 0, y: -80, overwrite: true, ease:'power3.out'}),
      onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.1, overwrite: true, ease:'power3.out'}),
      onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 80, overwrite: true, ease:'power3.out'}),
      //  markers:true,
      start: "top 88%"
      // you can also define things like start, end, etc.
    });
    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".cards_related .card", {y: 0}));
  },
  "(max-width: 439px)": function() {
    gsap.set(".cards_related .card", { y: 40 });
    ScrollTrigger.batch(".cards_related .card", {
      interval: 0.1, // time window (in seconds) for batching to occur. 
      batchMax: 3,   // maximum batch size (targets)
      onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.1, grid: [1, 3]}, overwrite: true, ease:'power3.out'}),
      onLeave: batch => gsap.set(batch, {opacity: 0, y: -40, overwrite: true, ease:'power3.out'}),
      onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.1, overwrite: true, ease:'power3.out'}),
      onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 40, overwrite: true, ease:'power3.out'}),
      start: "top 96%"
    });
    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".cards_related .card", {y: 0}));
  }
});

ScrollTrigger.create({
  trigger: ".lee-detail",
  start: "top 80px", 
  end: "bottom 150px",
  pin: ".lee-detail_back-button"
  // markers:true
});