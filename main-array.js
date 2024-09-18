const mainEl = document.querySelector("main");
const newTodoInput = document.querySelector("#new-todo-input");
const addTodoBtn = document.querySelector("#add-todo");

let todos = [];
// [
//   {
//     text: "Todo 1",
//     id: 1,
//     completed: false,
//   },
//   {
//     text: "Todo 2",
//     id: 2,
//     completed: false,
//   },
// ]

let editId = null;

window.eachTodoActionFns = {
  checkEachTodoFn,
  deleteEachTodoFn,
  editEachTodoFn,
  saveEachTodoFn,
};
// window.deleteEachTodoFn = deleteEachTodoFn;
// window.checkEachTodoFn = checkEachTodoFn;
// window.editEachTodoFn = editEachTodoFn;
// window.saveEachTodoFn = saveEachTodoFn;

function createSingleTodo(todoParam) {
  const editMode = editId == todoParam.id;
  const customClass = todoParam.completed
    ? "form-control line-thru"
    : "form-control";

  const newTodo = `<div class="input-group mb-1">
                      <span class="input-group-text">
                        ${
                          todoParam.completed
                            ? `<input checked onclick="eachTodoActionFns.checkEachTodoFn('${todoParam.id}')" type="checkbox" />`
                            : `<input onclick="eachTodoActionFns.checkEachTodoFn('${todoParam.id}')" type="checkbox" />`
                        }
                      </span>
                      ${
                        editMode
                          ? `<input
                              id="input-${todoParam.id}"
                              type="text"
                              class="${customClass}"
                              value="${todoParam.text}"
                            />
                            <button onclick="eachTodoActionFns.saveEachTodoFn('${todoParam.id}')" class="btn btn-warning" type="button">
                              Save
                            </button>`
                          : `<input
                              disabled
                              type="text"
                              class="${customClass}"
                              value="${todoParam.text}"
                            />
                            <button onclick="eachTodoActionFns.editEachTodoFn('${todoParam.id}')" class="btn btn-secondary" type="button">
                              Edit
                            </button>`
                      }
                      <button onclick="eachTodoActionFns.deleteEachTodoFn('${
                        todoParam.id
                      }')" class="btn btn-danger" type="button">
                        Delete
                      </button>
                    </div>
                    `;
  mainEl.innerHTML += newTodo;
}

function saveEachTodoFn(id) {
  const inputElem = document.querySelector(`#input-${editId}`);

  todos.forEach((todo) => {
    if (todo.id == editId) {
      todo.text = inputElem.value;
    }
  });

  editId = null;

  createTodoListView();
}

function editEachTodoFn(id) {
  editId = id;

  createTodoListView();
}

function deleteEachTodoFn(id) {
  const newTodosArr = todos.filter((todo) => todo.id != id);
  todos = newTodosArr;

  createTodoListView();
}

function checkEachTodoFn(id) {
  todos.forEach((todo) => {
    if (todo.id == id) {
      todo.completed = !todo.completed;
    }
  });
  createTodoListView();
}

function createTodoListView() {
  mainEl.innerHTML = "";

  for (let todo of todos) {
    createSingleTodo(todo);
  }

  // todos.forEach((todo) => createSingleTodo(todo));
}

createTodoListView();

addTodoBtn.addEventListener("click", () => {
  const value = newTodoInput.value.trim();

  if (value !== "") {
    // const keys = Object.keys(todos); // [1,2,3,4]
    // const newId = keys.length ? keys[keys.length - 1] + 1 : 1;
    const newId = Math.random().toString(16).slice(2);

    const newTodo = {
      id: newId,
      text: value,
      completed: false,
    };

    todos.push(newTodo);
    createTodoListView();
  } else {
    console.log("Please add a text.");
  }

  newTodoInput.value = "";
});
