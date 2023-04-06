// export default function getWidthInUnit(num, unit) {
import $ from "../core";

$.prototype.getWidthInUnit = function (num, unit) {
  let width;

  if (unit !== "px") {
    width = num / 16 + unit;
  } else {
    width = num + unit;
  }

  return width;
};

$.prototype.getUnitNum = function (unit) {
  let width;

  if (unit !== "px") {
    width = 16;
  } else {
    width = 1;
  }

  return width;
};
