import createTodoItem from "./createTodoItem";
import saveItem from "./saveItem";

export default function todo() {
  const form = $("form");
  const formInput = $(".form__input");
  const formBtn = $(".form__btn");
  const todoList = $(".todo__list");

  const itemArr = [];
  let counter = 1;

  form.on("submit", handlerSubmit);

  function handlerSubmit(e) {
    e.preventDefault();

    const inputValue = $(this).find("input").val();
    const id = counter;
    createObj(counter, inputValue);

    createTodoItem(todoList, inputValue, id);
    counter++;

    formInput.val("");
    console.log(formInput);

    onClick();
  }

  function createObj(id, value, checked = false) {
    const obj = {
      id,
      value,
      checked,
    };

    itemArr.push(obj);
    console.log(itemArr);
    saveItem("todoItem", itemArr);
  }

  function onClick() {
    $(".todo__list").find("[data-edit]").on("click", onEdit);
    $(".todo__list").find("[data-checked]").on("click", onChecked);
    $(".todo__list").find("[data-del]").on("click", onDelete);
  }

  function onEdit(e) {
    form.off("submit", handlerSubmit);
    //
    const title = $(this).closest("[data-item]").find("h2");

    form.on("submit", handlerSubmitChange);
    setTimeout(() => {
      window.addEventListener("click", handlerChange);
    }, 10);

    formInput[0].focus();
    formInput.val(title.html());
    $("[data-item]").removeClass("edit");
    $(this).closest("[data-item]").addClass("edit");
  }

  function handlerChange(e) {
    // if (!e.target.classList.contains("form__btn")) {
    //   if (!e.target.classList.contains("form__input")) {
    if (!$(e.target).contains("form__btn")) {
      if (!$(e.target).contains("form__input")) {
        if (!$(e.target).hasAttr("data-edit")) {
          form.off("submit", handlerSubmitChange);
          window.removeEventListener("click", handlerChange);
          $(".todo__list").find(".edit").removeClass("edit");
          formInput.val("");
          //
          form.on("submit", handlerSubmit);
        }
      }
    }
  }

  function handlerSubmitChange(e) {
    e.preventDefault();

    const title = $(".todo__list").find(".edit").find("h2");
    const inputValue = $(this).find("input").val();

    title.html(inputValue);
    $(".todo__list").find(".edit").removeClass("edit");

    $(this).find("input").val("");
    //
    form.off("submit", handlerSubmitChange);
    window.removeEventListener("click", handlerChange);
    //
    form.on("submit", handlerSubmit);
    changeArray(title[0], "edit", inputValue);
    saveItem("todoItem", itemArr);
  }

  function onChecked(e) {
    e.preventDefault();
    console.log("onChecked");
    const check = $(this).closest("[data-checked]");

    if (check.getAttr("data-checked") === "false") {
      check.setAttr("data-checked", "true");
      changeArray(this, "true");
      const id = $(this).closest("[data-item]").getAttr("id").slice(4);
      $(this).closest("[data-item]").addClass("completed").style("order", id);
    } else {
      check.setAttr("data-checked", "false");
      changeArray(this, "false");
      $(this).closest("[data-item]").removeClass("completed").style("order", "");
    }

    console.log(itemArr);
    saveItem("todoItem", itemArr);
  }

  function onDelete(e) {
    e.preventDefault();
    changeArray(this, "del");

    if ($(this).closest("[data-item]").contains("edit")) {
      form.off("submit", handlerSubmitChange);
      window.removeEventListener("click", handlerChange);

      form.on("submit", handlerSubmit);

      if (formInput.valLength() > 0) {
        formInput[0].focus();
      }
    }

    $(this).closest("[data-item]").remove();

    if ($(".todo__list").children().length === 0) {
      counter = 0;
    }

    saveItem("todoItem", itemArr);
  }

  function changeArray(elem, val, edit) {
    const id = $(elem).closest("[data-item]").getAttr("id").slice(4);

    itemArr.forEach((item, i) => {
      if (item.id == id) {
        if (val === "del") {
          itemArr.splice(i, 1);
        } else if (val === "true") {
          item.checked = true;
        } else if (val === "false") {
          item.checked = false;
        } else if (val === "edit") {
          item.value = edit;
        }
      }
    });
  }

  function init() {
    const newArr = JSON.parse(localStorage.getItem("todoItem"));
    if (newArr.length === 0) {
      return;
    }

    newArr.forEach((item) => {
      itemArr.push(item);
      createTodoItem(todoList, item.value, item.id, item.checked);
      counter = item.id + 1;
    });

    onClick();
    console.log(itemArr);
  }
  init();
}
