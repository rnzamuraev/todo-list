import $ from "../core";

$.prototype.disabled = function (time) {
  for (let i = 0; i < this.length; i++) {

    if (!time) {
      this[i].setAttribute("disabled", "disabled");
      return;
    }

    console.log(time);
    this[i].setAttribute("disabled", "disabled");
    setTimeout(() => {
      this[i].removeAttribute("disabled");
    }, time);
  }
};
