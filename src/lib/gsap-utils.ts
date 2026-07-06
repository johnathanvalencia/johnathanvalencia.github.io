// GSAP utility functions shared across pages

export function cursorHello() {
  const element = document.getElementById("cursorAsset");
  if (!element) return;
  const name = "cursor-hello";
  const arr = element.className.split(" ");
  if (arr.indexOf(name) === -1) {
    element.className += " " + name;
  }
}

export function removeCursorHello() {
  const element = document.getElementById("cursorAsset");
  if (!element) return;
  element.className = element.className.replace(/\bcursor-hello\b/g, "");
}

export function cursorBtn() {
  const element = document.getElementById("cursorStyle");
  if (!element) return;
  const name = "cursor-outline-btn";
  const arr = element.className.split(" ");
  if (arr.indexOf(name) === -1) {
    element.className += " " + name;
  }
  cursorHide();
}

export function removeCursorBtn() {
  const element = document.getElementById("cursorStyle");
  if (!element) return;
  element.className = element.className.replace(/\bcursor-outline-btn\b/g, "");
  cursorShow();
}

export function cursorBlow() {
  const element = document.getElementById("cursorStyle");
  if (!element) return;
  const name = "cursor-outline-blow";
  const arr = element.className.split(" ");
  if (arr.indexOf(name) === -1) {
    element.className += " " + name;
  }
}

export function removeCursorBlow() {
  const element = document.getElementById("cursorStyle");
  if (!element) return;
  element.className = element.className.replace(/\bcursor-outline-blow\b/g, "");
}

export function cursorLaptop() {
  const element = document.getElementById("cursorAsset");
  if (!element) return;
  const name = "cursor-laptop";
  const arr = element.className.split(" ");
  if (arr.indexOf(name) === -1) {
    element.className += " " + name;
  }
}

export function removeCursorLaptop() {
  const element = document.getElementById("cursorAsset");
  if (!element) return;
  element.className = element.className.replace(/\bcursor-laptop\b/g, "");
}

export function cursorHide() {
  const element = document.getElementById("circle");
  if (!element) return;
  const name = "cursor-hide";
  const arr = element.className.split(" ");
  if (arr.indexOf(name) === -1) {
    element.className += " " + name;
  }
}

export function cursorShow() {
  const element = document.getElementById("circle");
  if (!element) return;
  element.className = element.className.replace(/\bcursor-hide\b/g, "");
}

export function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function initCursor() {
  const cursor = {
    delay: 4,
    _x: 0,
    _y: 0,
    endX: (typeof window !== 'undefined' ? window.innerWidth : 0) / 2,
    endY: (typeof window !== 'undefined' ? window.innerHeight : 0) / 2,
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: null as HTMLElement | null,
    $outline: null as HTMLElement | null,

    init: function () {
      this.$dot = document.querySelector('.cursor-dot');
      this.$outline = document.querySelector('.cursor-dot-outline');
      if (!this.$dot || !this.$outline) return;

      this.setupEventListeners();
      this.animateDotOutline();
    },

    setupEventListeners: function () {
      const self = this;

      // Anchor hovering
      document.querySelectorAll('a').forEach(function (el) {
        el.addEventListener('mouseover', function () {
          self.cursorEnlarged = true;
          self.toggleCursorSize();
        });
        el.addEventListener('mouseout', function () {
          self.cursorEnlarged = false;
          self.toggleCursorSize();
        });
      });

      // Click events
      document.addEventListener('mousedown', function () {
        self.cursorEnlarged = true;
        self.toggleCursorSize();
      });
      document.addEventListener('mouseup', function () {
        self.cursorEnlarged = false;
        self.toggleCursorSize();
      });

      document.addEventListener('mousemove', function (e) {
        self.cursorVisible = true;
        self.toggleCursorVisibility();
        self.endX = e.pageX;
        self.endY = e.pageY;
        if (self.$dot) {
          self.$dot.style.top = self.endY + 'px';
          self.$dot.style.left = self.endX + 'px';
        }
      });

      document.addEventListener('mouseenter', function () {
        self.cursorVisible = true;
        self.toggleCursorVisibility();
        if (self.$dot) self.$dot.style.opacity = '1';
        if (self.$outline) self.$outline.style.opacity = '1';
      });

      document.addEventListener('mouseleave', function () {
        self.cursorVisible = true;
        self.toggleCursorVisibility();
        if (self.$dot) self.$dot.style.opacity = '0';
        if (self.$outline) self.$outline.style.opacity = '0';
      });
    },

    animateDotOutline: function () {
      const self = this;
      self._x += (self.endX - self._x) / self.delay;
      self._y += (self.endY - self._y) / self.delay;
      if (self.$outline) {
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';
      }
      requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function () {
      const self = this;
      if (self.cursorEnlarged) {
        if (self.$dot) self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
        if (self.$outline) self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      } else {
        if (self.$dot) self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
        if (self.$outline) self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    },

    toggleCursorVisibility: function () {
      const self = this;
      if (self.cursorVisible) {
        if (self.$dot) self.$dot.style.opacity = '1';
        if (self.$outline) self.$outline.style.opacity = '1';
      } else {
        if (self.$dot) self.$dot.style.opacity = '0';
        if (self.$outline) self.$outline.style.opacity = '0';
      }
    }
  };

  cursor.init();
  return cursor;
}
