let add = document.querySelector(".add");
let input = document.querySelector("input");
let tasksContainer = document.querySelector(".tasks");
let all = document.querySelector(".all");
let arrayOfTasks = [];

if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// localStorage.clear()

getFromLocalStorage();

add.onclick = function () {
  if (input.value != "") {
    input.style.border = ""
    addTaskToArray(input.value);
    input.value = "";
  } else {
    input.style.border = "solid 1px #D00000"
  }
};

function addTaskToArray(textInput) {
  const task = {
    id: Date.now(),
    title: textInput,
    status: false,
  };
  arrayOfTasks.push(task);
  addTasksToPage(arrayOfTasks);
  addToLocalStorage(arrayOfTasks);
}

function addTasksToPage(arrayOfTasks) {
  tasksContainer.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task");
    if(task.status){
      taskContainer.className = "task done"
    }
    taskContainer.setAttribute("data-id", task.id);
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(task.title));
    taskContainer.insertAdjacentElement("afterbegin", p);
    let iconsContainer = document.createElement("div");
    iconsContainer.classList.add("icons");
    let complete = document.createElement("button");
    complete.classList.add("green");
    complete.appendChild(document.createTextNode("Completed"));
    iconsContainer.insertAdjacentElement("afterbegin", complete);
    let remove = document.createElement("button");
    remove.classList.add("red");
    remove.appendChild(document.createTextNode("Remove"));
    iconsContainer.insertAdjacentElement("beforeend", remove);
    taskContainer.insertAdjacentElement("beforeend", iconsContainer);
    tasksContainer.insertAdjacentElement("beforeend", taskContainer);
  });
}

function addToLocalStorage(arrayOfTasks) {
  let tasks = JSON.stringify(arrayOfTasks);
  window.localStorage.setItem("tasks", tasks);
}

function getFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    addTasksToPage(tasks);
  }
}

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("red")) {
    e.target.closest(".task").remove();
    removeFromLocalStorage(e.target.closest(".task").getAttribute("data-id"));
  }
  else if (e.target.classList.contains("green")){
    e.target.closest(".task").classList.toggle("done")
    changeStatus(e.target.closest(".task").getAttribute("data-id"))
  }
});

function changeStatus(id){
  for(let i=0 ; i < arrayOfTasks.length ; i++){
    if(arrayOfTasks[i].id == id){
      arrayOfTasks[i].status == false ? arrayOfTasks[i].status = true : arrayOfTasks[i].status = false
    }
  }
  addToLocalStorage(arrayOfTasks)
}

function removeFromLocalStorage(id) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
  addToLocalStorage(arrayOfTasks)
}

all.onclick = function () {
  tasksContainer.innerHTML = "";
  localStorage.clear();
  arrayOfTasks = [];
};
