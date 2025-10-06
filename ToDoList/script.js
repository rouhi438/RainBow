const input = document.querySelector(".task-input");
const addBtn = document.querySelector(".add-task-btn");
const listToDo = document.querySelector("ul");
const radioBtn = document.querySelector(".radio");

const progressBtn = document.querySelector(".progress");
const finishedBtn = document.querySelector(".finished-task");
const allTaskBtn = document.querySelector(".all-tasks");
const listTitel = document.querySelector("h2");

// defining Function to create randomColor for ListTitle
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
setInterval(() => {
  listTitel.style.color = randomColor();
}, 8000);

//defining empty array for adding tasks in the local storage to prevent of removing
let items;
if (!localStorage.getItem("newTask")) {
  items = [];
} else {
  items = getTask();
}
console.log(items);

/// == adding new NODE to DOM
addBtn.addEventListener("click", function () {
  let el = input.value;

  let newLi = createNew(el);
  if (input.value == "") {
    alert("please fill the field.");
    return;
  }
  saveTasks(el);
  newLi.innerHTML += `<input class="checkbox" type="radio" />`;
  newLi.innerHTML += `<span class="trash"><i class="fa-solid fa-trash-can"></i></span>`;
  listToDo.appendChild(newLi);
  input.value = "";
});

//== creating NODE function
function createNew(el) {
  let li = document.createElement("li");
  li.textContent = el;
  return li;
}

// defining function to create list from localStorage after loading the page
function showTask() {
  // traversaling on localStorage Array that got by getTsk()function
  for (const taskText of getTask()) {
    let newLi = createNew(taskText);
    newLi.innerHTML += `<input class="checkbox" type="radio" />`;
    newLi.innerHTML += `<span class="trash"><i class="fa-solid fa-trash-can"></i></span>`;
    listToDo.appendChild(newLi);
  }
}
showTask();

//== clean the LI value or list Item by trash icon with using EVENT Deligation

listToDo.addEventListener("click", function (event) {
  let target = event.target;

  // remove li by click on trash icon

  if (event.target.nodeName === "I") {
    const li = event.target.closest("li");
    const text = li.firstChild.textContent;
    li.remove();
    items.splice(items.indexOf(text), 1);
    localStorage.setItem("newTask", items);
  }
  // drawing line on the li.value by click on radioButton and checked
  if (
    (target.nodeName === "INPUT" && target.type === "checkbox") ||
    target.type === "radio"
  ) {
    const li = target.closest("li");
    const trash = li.querySelector(".trash");
    if (target.checked) {
      target.parentElement.style.textDecoration = "line-through";
      target.parentElement.style.textDecorationColor = "red";
      trash.style.display = "block";
      li.style.display = "none";
    } else {
      target.parentElement.style.textDecoration = "none";
      trash.style.display = "none";
    }
  }
});

//== Adding tasks to localStorage for prevent of removing after the loading page or turn off
function saveTasks(task) {
  items.push(task);
  localStorage.setItem("newTask", items);
}

// == for prevent of make and return empty "Li" without value
function getTask() {
  let tasks = localStorage.getItem("newTask");
  if (!tasks) return []; // empty Array (there is no task yet)
  return tasks.split(",").filter((task) => task.trim() !== "");
}

// mobile support code
addBtn.addEventListener("touchstart", function () {
  let el = input.value;
  let newLi = createNew(el);
  if (input.value == "") {
    alert("please fill the field.");
    return;
  }
  newLi.innerHTML += `<input class="checkbox" type="radio" />`;
  newLi.innerHTML += `<span class="trash"><i class="fa-solid fa-trash-can"></i></span>`;
  listToDo.appendChild(newLi);
  input.value = "";
});

// Adding eventListener for filtering Buttons
allTaskBtn.addEventListener("click", () => filterTasks("all"));
progressBtn.addEventListener("click", () => filterTasks("progress"));
finishedBtn.addEventListener("click", () => filterTasks("finished"));

// defining function for filtering Tasks
function filterTasks(status) {
  const tasks = listToDo.querySelectorAll("li");
  tasks.forEach((task) => {
    const finished = task.querySelector('input[type="radio"]').checked;

    if (status === "all") {
      task.style.display = "block";
    } else if (status === "progress") {
      task.style.display = finished ? "none" : "block";
    } else if (status === "finished") {
      task.style.display = finished ? "block" : "none";
    }
  });
}

// changing eventListener to save Completion status
listToDo.addEventListener("click", function (event) {
  let target = event.target;

  if (event.target.nodeName === "I") {
    const li = event.target.closest("li");
    const text = li.firstChild.textContent;
    li.remove();
    items.splice(items.indexOf(text), 1);
    localStorage.setItem("newTask", items);
  }

  // changing styles of input value by checkbox
  if (
    (target.nodeName === "INPUT" && target.type === "checkbox") ||
    target.type === "radio"
  ) {
    if (target.checked) {
      target.parentElement.style.textDecoration = "line-through";
      target.parentElement.style.textDecorationColor = "red";
    } else {
      target.parentElement.style.textDecoration = "none";
    }

    //Saving Completion in LocalStorage
    updateTaskStatus(target.parentElement);
  }
});

// Function for updating Tasks in LocalStorage
function updateTaskStatus(taskElement) {
  const taskText = taskElement.firstChild.textContent;
  const isCompleted = taskElement.querySelector('input[type="radio"]').checked;

  // Make or updating LocalStorage for Completion Status.
  let taskStatuses = JSON.parse(localStorage.getItem("taskStatuses") || "{}");
  taskStatuses[taskText] = isCompleted;
  localStorage.setItem("taskStatuses", JSON.stringify(taskStatuses));
}

// changing in showtask() Function for uploading Completion Status
function showTask() {
  const taskStatuses = JSON.parse(localStorage.getItem("taskStatuses") || "{}");

  for (const taskText of getTask()) {
    let newLi = createNew(taskText);
    newLi.innerHTML += `<input class="checkbox" type="radio" ${
      taskStatuses[taskText] ? "checked" : ""
    }/>`;
    newLi.innerHTML += `<span class="trash"><i class="fa-solid fa-trash-can"></i></span>`;

    if (taskStatuses[taskText]) {
      newLi.style.textDecoration = "line-through";
      newLi.style.textDecorationColor = "red";
    }

    listToDo.appendChild(newLi);
  }
}
