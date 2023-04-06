import $ from "../core";
import { _errThisElements, _errThisUndefined, _errArgUndefined } from "../services/_error";
import { _getStyleValue, _setStyleValue } from "../services/_switchValue";

$.prototype.style = function (styleName, value) {
  _errThisUndefined(this[0], "style");
  _errArgUndefined(styleName, "style");

  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }

    if (Array.isArray(styleName)) {

      for (let j = 0; j < styleName.length; j++) {
        _errArgUndefined(styleName[j][0], "style");
        if (styleName[j][1] !== "") {
          _errArgUndefined(styleName[j][1], "style");
        }

        _setStyleValue(this[i].style, styleName[j][0], styleName[j][1]);
      }
    } else {
      if (value !== "" && !value) {
        _errThisElements(this, "style");

        return _getStyleValue(window.getComputedStyle(this[i]), styleName);
      }

      _setStyleValue(this[i].style, styleName, value);
    }
  }

  return this;
};

$.prototype.getStyle = function (styleName) {
  _errThisElements(this, "getStyle");
  _errThisUndefined(this[0], "getStyle");
  _errArgUndefined(styleName, "getStyle");

  for (let i = 0; i < this.length; i++) {
    return _getStyle(window.getComputedStyle(this[i]), styleName);
  }
};
