const mainEl = document.querySelector("main");
const newTodoInput = document.querySelector("#new-todo-input");
const addTodoBtn = document.querySelector("#add-todo");

let todos = {};
// {
//   1: {
//     text: "Todo 1",
//     completed: false,
//   },
//   2: {
//     text: "Todo 2",
//     completed: false,
//   },
// }

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

function createSingleTodo(id, todoParam) {
  const editMode = editId == id;
  const customClass = todoParam.completed
    ? "form-control line-thru"
    : "form-control";

  const newTodo = `<div class="input-group mb-1">
                      <span class="input-group-text">
                        ${
                          todoParam.completed
                            ? `<input checked onclick="eachTodoActionFns.checkEachTodoFn('${id}')" type="checkbox" />`
                            : `<input onclick="eachTodoActionFns.checkEachTodoFn('${id}')" type="checkbox" />`
                        }
                      </span>
                      ${
                        editMode
                          ? `<input
                              id="input-${id}"
                              type="text"
                              class="${customClass}"
                              value="${todoParam.text}"
                            />
                            <button onclick="eachTodoActionFns.saveEachTodoFn('${id}')" class="btn btn-warning" type="button">
                              Save
                            </button>`
                          : `<input
                              disabled
                              type="text"
                              class="${customClass}"
                              value="${todoParam.text}"
                            />
                            <button onclick="eachTodoActionFns.editEachTodoFn('${id}')" class="btn btn-secondary" type="button">
                              Edit
                            </button>`
                      }
                      <button onclick="eachTodoActionFns.deleteEachTodoFn('${id}')" class="btn btn-danger" type="button">
                        Delete
                      </button>
                    </div>
                    `;
  mainEl.innerHTML += newTodo;
}

function saveEachTodoFn(id) {
  const inputElem = document.querySelector(`#input-${editId}`);

  todos[editId].text = inputElem.value;

  editId = null;

  createTodoListView();
}

function editEachTodoFn(id) {
  editId = id;

  createTodoListView();
}

function deleteEachTodoFn(id) {
  delete todos[id];

  createTodoListView();
}

function checkEachTodoFn(id) {
  todos[id].completed = !todos[id].completed;
  createTodoListView();
}

function createTodoListView() {
  mainEl.innerHTML = "";

  for (let key in todos) {
    createSingleTodo(key, todos[key]);
  }
}

createTodoListView();

addTodoBtn.addEventListener("click", () => {
  const value = newTodoInput.value.trim();

  if (value !== "") {
    // const keys = Object.keys(todos); // [1,2,3,4]
    // const newId = keys.length ? keys[keys.length - 1] + 1 : 1;
    const newId = Math.random().toString(16).slice(2);

    const newTodo = {
      text: value,
      completed: false,
    };

    todos[newId] = newTodo;
    createTodoListView();
  } else {
    console.log("Please add a text.");
  }

  newTodoInput.value = "";
});
