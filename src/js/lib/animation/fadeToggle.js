import $ from "../core";

$.prototype.fadeToggle = function (dur, display = "block", fin) {
  for (let i = 0; i < this.length; i++) {
    if (window.getComputedStyle(this[i]).display === "none") {
      $(this[i]).fadeIn(dur, display, fin);
    } else {
      $(this[i]).fadeOut(dur, fin);
    }
  }

  return this;
};
