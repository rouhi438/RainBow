const input = document.querySelector(".content");
const addBtn = document.querySelector(".add");
const listToDo = document.querySelector("ul");

const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search");
const radioBtn = document.querySelector(".radio");

//defining empty array for adding tasks in the local storage to prevent of removing
let items;
if (!localStorage.getItem("newTask")) {
  items = [];
} else {
  items = getTask();
}
console.log(items);

/// === adding new NODE to DOM ===============================
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

//====== creating NODE function ==============================
function createNew(el) {
  let li = document.createElement("li");
  li.textContent = el;
  return li;
}

//========Adding tasks to localStorage for prevent of removing after the loading page or turn off
function saveTasks(task) {
  items.push(task);
  localStorage.setItem("newTask", items);
}
function getTask() {
  return localStorage.getItem("newTask").split(",");
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

//======Activate SEARCH input ================================
searchIcon.addEventListener("click", function () {
  searchInput.classList.toggle("hidden");
});

//===== clean the LI value or list Item by trash icon with using EVENT Deligation
listToDo.addEventListener("click", function (event) {
  let target = event.target;

  // remove li by click on trash icon
  if (event.target.nodeName === "I") {
    const li = event.target.closest("li");
    const text = li.firstChild.textContent;
    li.remove();
    items.splice(items.indexOf(text), 1);
    localStorage.setItem("newTask", items);
    //event.target.parentElement.parentElement.style = "display: none";
    //event.target.closest("li").remove();
    //items.splice(items.indexOf(event.target.textContent), 1);
    //localStorage.setItem("newTask", items);
  }
  // drawing line on the li.value by click on radioButton and checked
  if (
    (target.nodeName === "INPUT" && target.type === "checkbox") ||
    target.type === "radio"
  ) {
    target.parentElement.style.textDecoration = target.checked
      ? "line-through"
      : "none";
    target.parentElement.style.textDecorationColor = "red";
  }
});

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
