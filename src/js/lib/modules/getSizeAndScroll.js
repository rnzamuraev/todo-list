import $ from "../core";

$.prototype.getSizeAndScroll = function (value) {
  for (let i = 0; i < this.length; i++) {
    return _getElSizeAndScroll(this[i], value);
  }
};

export function _getElSizeAndScroll(elem, value) {
  switch (value) {
    case "clientWidth":
      return elem.clientWidth;
    case "clientHeight":
      return elem.clientHeight;
    case "clientLeft":
      return elem.clientLeft;
    case "clientTop":
      return elem.clientTop;
    case "offsetLeft":
      return elem.offsetLeft;
    case "offsetTop":
      return elem.offsetTop;
    case "offsetWidth":
      return elem.offsetWidth;
    case "offsetHeight":
      return elem.offsetHeight;
    //**??? */
    case "scrollWidth":
      return elem.scrollWidth;
    case "scrollHeight":
      return elem.scrollHeight;
    //**??? */
    case "scrollLeft":
      return elem.scrollLeft;
    case "scrollTop":
      return elem.scrollTop;
  }
}
