var d = document,
    hamburger = true,
    menuClosed = true;

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

function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if(elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
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
}

function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {
  
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
        start: "360px 20%",
        end: "+=80px"
        // id: "jv-logo",
        // markers: true
      }
    });
    
    logoCollapse.to('.logo-johnathan-mask', { duration:.4, width:'6px', x:-44, ease:Power2.easeOut })
      .to('.logo-valencia-mask', { duration:.4, width:'12px', x:-45, ease:Power2.easeOut }, 0)
      .to('.logo-end-mask', { duration:.4, x:-45, ease:Power2.easeOut }, 0);
  },
  "(min-width: 768px) and (max-width: 1279px)": function() {
    var logoCollapse = gsap.timeline({
      scrollTrigger: {
        trigger: ".jv-logo",
        scrub: true,
        start: "320px 20%",
        end: "+=80px"
        // id: "jv-logo",
        // markers: true
      }
    });
    
    logoCollapse.to('.logo-johnathan-mask', { duration:.4, width:'6px', x:-65, ease:Power2.easeOut })
      .to('.logo-valencia-mask', { duration:.4, width:'12px', x:-64, ease:Power2.easeOut }, 0)
      .to('.logo-end-mask', { duration:.4, x:-64, ease:Power2.easeOut }, 0);
  },
  "(max-width: 767px)": function() {
    var logoCollapse = gsap.timeline({
      scrollTrigger: {
        trigger: ".jv-logo",
        scrub: true,
        start: "320px 20%",
        end: "+=80px"
        // id: "jv-logo",
        // markers: true
      }
    });
    
    logoCollapse.to('.logo-johnathan-mask', { duration:.4, width:'6px', x:-47, ease:Power2.easeOut })
      .to('.logo-valencia-mask', { duration:.4, width:'12px', x:-48, ease:Power2.easeOut }, 0)
      .to('.logo-end-mask', { duration:.4, x:-48, ease:Power2.easeOut }, 0);
  }
});

/* Pinning */

ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 1280px)": function() {
    ScrollTrigger.create({
      trigger: "#customerStrategy",
      pin: ".customer-strategy-goals",
      start: "top 24%",
      end: "+=496"
      // id: "pin-customer",
      // markers: true
    });
  }
});

ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 1280px)": function() {
    ScrollTrigger.create({
      trigger: "#setfStrategy",
      pin: ".setf-strategy-goals",
      start: "top 24%",
      end: "+=464"
      // id: "pin-setf",
      // markers: true
    });
  }
});


/* Full Width Image Reveal */

let revealContainers = document.querySelectorAll(".full-width-img_reveal");

revealContainers.forEach((container) => {
  let image = container.querySelector("img");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      toggleActions: "restart none none reset"
    }
  });

  tl.set(container, { autoAlpha: 1 });
  tl.from(container, 1.5, {
    xPercent: -100,
    ease: Power2.out
  });
  tl.from(image, 1.5, {
    xPercent: 100,
    scale: 1.3,
    delay: -1.5,
    ease: Power2.out
  });
});


function initHome() {
  var url = 'index.html';
  window.open(url, "_self");
}