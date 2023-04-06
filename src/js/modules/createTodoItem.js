export default function createTodoItem(elem, value, id, check = "false") {
  const todoItemTitle = $().create("h2").addClass("todo__title", "item-title").html(value);
  const todoItemCheckbox = $()
    .create("input")
    .setAttr("type", "checkbox")
    .setAttr("id", "check")
    .addClass("todo__checkbox");
  const todoItemSpan = $().create("span").addClass("todo__checkbox-custom");
  // .setAttr("data-checked", "false");
  const todoItemLabel = $()
    .create("label")
    .addClass("todo__label")
    .setAttr("data-checked", check)
    .setAttr("for", "check")
    .append(todoItemCheckbox, todoItemSpan);
  //
  const todoItemImgEdit = $().create("img").addClass("todo__ed");
  // .setAttr("src", "../img/pen.png");
  const todoItemEdit = $()
    .create("button")
    .addClass("todo__edit")
    .setAttr("data-edit", "")
    .append(todoItemImgEdit);
  //
  const todoItemImg = $().create("img").addClass("todo__del");
  // .setAttr("src", "../img/Delete.svg");
  const todoItemDel = $()
    .create("button")
    .addClass("todo__delete")
    .setAttr("data-del", "")
    .append(todoItemImg);
  const todoItem = $()
    .create("li")
    .addClass("todo__item")
    .setAttr("id", `item${id}`)
    .setAttr("data-item", "")
    // .append(todoItemTitle, todoItemLabel, todoItemDel);
    .append(todoItemTitle, todoItemEdit, todoItemLabel, todoItemDel);

  console.log(check);
  if (check === true) {
    todoItem.addClass("completed").style("order", id);
  }

  elem.prepend(todoItem);
}
