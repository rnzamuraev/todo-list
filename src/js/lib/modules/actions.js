import $ from "../core";
import {
  _errThisElements,
  _errThisUndefined,
  _errThisNotTagName,
  _errArgUndefined,
  _errArgNotTagName,
  _errArgNotSelector,
  _errArg,
} from "../services/_error";

// eq - находит елемент по указанному индексу
$.prototype.eq = function (ind) {
  if ((!ind && ind !== 0) || ind !== Number) {
    throw new Error(
      `
      - Что-то пошло не так, такого индекса нет, __eq__ (${ind})
      - No such index, __eq__ (${ind})
      `
    );
  }

  const elem = this[ind];

  const objLength = Object.keys(this).length; //Создаем копию обьекта со всеми элементами
  for (let i = 0; i < objLength; i++) {
    delete this[i];
  }

  this[0] = elem;
  this.length = 1;
  return this;
};

// index - находит индекс элемента на котором было совершено действие
$.prototype.index = function () {
  _errThisElements(this, "index");
  _errThisUndefined(this[0], "index");

  for (let i = 0; i < this.length; i++) {
    const parent = this[i].parentNode;
    const childs = parent.children;

    const findMyIndex = (elem) => {
      for (let j = 0; j < childs.length; j++) {
        if (childs[j] == elem) {
          return j;
        }
      }
    };

    // return childs.findIndex(findMyIndex);
    return findMyIndex(this[i]);
  }
};

// find - получает все дочерние элементы по заданному селуктору
$.prototype.find = function (selector) {
  _errThisElements(this, "find");
  _errThisUndefined(this[0], "find");
  _errArgUndefined(selector, "find");
  _errArgNotSelector(selector, "find");

  let counter = 0;
  let arr = [];

  const copiObj = Object.assign({}, this);

  for (let i = 0; i < copiObj.length; i++) {
    delete this[i];
    arr[i] = copiObj[i].querySelectorAll(selector);

    if (arr[i].length == 0) {
      continue;
    }

    for (let j = 0; j < arr[i].length; j++) {
      this[counter] = arr[i][j];
      counter++;
    }
  }

  this.length = counter;
  console.log(this);
  return this;
};

// closest - находит ближайший родительский контайнер по указанному селектору,
// или сам элемент если он подходит по селектору, возвращает первыйнайденный контайнер
$.prototype.closest = function (selector) {
  if (!selector) {
    return this;
  }

  let counter = 0;
  let arr = [];

  for (let i = 0; i < this.length; i++) {
    arr[i] = this[i].closest(selector);

    if (arr[i] == null) {
      continue;
    }

    this[counter] = arr[i];
    counter++;
  }

  const objLength = Object.keys(this).length;

  for (let i = 1; i < objLength; i++) {
    delete this[i];
  }

  this.length = 1;
  return this;
};

// siblings - находим всех соседей елемента на котором было совершено действие,
// кроме самого элемента
$.prototype.siblings = function () {
  let counter = 0;

  const copiObj = Object.assign({}, this);
  const arr = copiObj[0].parentNode.children;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == copiObj[0]) {
      continue;
    }

    this[counter] = arr[i];
    counter++;
  }

  this.length = counter;

  return this;
};

// prevSibling - находит элемент стоящий перед применяемым
$.prototype.prevSibling = function () {
  _errThisElements(this, "prevSibling");

  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].previousElementSibling;

    if (this[i] == null) {
      return null;
    }
  }

  return this;
};

// hextSibling - находит элемент стоящий после применяемого
$.prototype.nextSibling = function () {
  _errThisElements(this, "nextSibling");

  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].nextElementSibling;

    if (this[i] == null) {
      return null;
    }
  }

  return this;
};

// parent - получает родительский элемент
$.prototype.parent = function () {
  _errThisElements(this, "parent");

  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].parentNode;
  }

  return this;
};

// children - находит всех детей заданного елемента или
$.prototype.children = function () {
  _errThisElements(this, "children");
  _errThisUndefined(this[0], "children");

  let counter = 0;
  const arr = [];

  for (let i = 0; i < this.length; i++) {
    arr[i] = this[i].children;

    if (!arr[i].length) {
      continue;
    }

    for (let j = 0; j < arr[i].length; j++) {
      this[counter] = arr[i][j];
      counter++;
    }
  }

  this.length = counter;

  if (this.length == 0) {
    delete this[0];
  }

  return this;
};

$.prototype.firstChild = function () {
  _errThisElements(this, "firstChild");
  _errThisUndefined(this[0], "lastChild");

  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].firstElementChild;
  }

  return this;
};

$.prototype.lastChild = function () {
  _errThisElements(this, "lastChild");
  _errThisUndefined(this[0], "lastChild");

  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].lastElementChild;
  }

  return this;
};

// create
$.prototype.create = function (node) {
  if (!node && createElement == node.tagName) {
    return this;
  }

  this[0] = document.createElement(node);
  this.length = 1;
  return this;
};

// parentAppend;
$.prototype.parentAppend = function (parent) {

  _errThisElements(this, "parentAppend");
  _errThisUndefined(this[0], "parentAppend");

  for (let i = 0; i < this.length; i++) {
    _errThisNotTagName(this[i], "parentAppend");

    for (let j = 0; j < parent.length; j++) {
      if (typeof parent[j] === "object" && !parent[j].tagName) {
        _append(this[i], parent[j][i]);
      } else if (typeof parent[j] === "object" && parent[j].tagName) {
        _append(this[i], parent[j]);
      } else {
        _errArgUndefined(parent[j], "parentAppend");
        _errArgNotTagName(parent[j], "parentAppend");
      }

      function _append(elem, arg) {
        if (!arg.appendChild) {
          arg.appendChild(elem);
        } else {
          arg.append(elem);
        }
      }
    }
  }

  return this;
};

// append;
$.prototype.append = function (...child) {

  _errThisElements(this, "append");
  _errThisUndefined(this[0], "append");

  for (let i = 0; i < this.length; i++) {

    for (let j = 0; j < child.length; j++) {
      if (typeof child[j] === "object" && !child[j].tagName) {
        _append(this[i], child[j][i]);
      } else if (typeof child[j] === "object" && child[j].tagName) {
        _append(this[i], child[j]);
      } else {
        _errArgUndefined(child[j], "append");
      }

      function _append(elem, arg) {
        if (!elem.appendChild) {
          elem.appendChild(arg);
        } else {
          elem.append(arg);
        }
      }
    }
  }

  return this;
};

// prepend;
$.prototype.prepend = function (...child) {

  _errThisElements(this, "prepend");
  _errThisUndefined(this[0], "prepend");

  for (let i = 0; i < this.length; i++) {

    for (let j = 0; j < child.length; j++) {
      if (typeof child[j] === "object" && !child[j].tagName) {
        this[i].prepend(child[j][i]);
      } else if (typeof child[j] === "object" && child[j].tagName) {
        this[i].prepend(child[j]);
      } else {
        _errArgUndefined(child[j], "prepend");
      }
    }
  }

  return this;
};

// remove;
$.prototype.remove = function () {

  _errThisUndefined(this[0], "remove");

  for (let i = 0; i < this.length; i++) {
    this[i].remove();
  }

  return;
};
