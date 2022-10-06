// ======================Start To Do Lst======================

let tasksContainer = document.querySelector(".containerTasks");
let form = document.querySelector("form");
let typeTask = document.querySelector(".typeTask");
let addTask = document.querySelector(".addTask");
let doneSound = document.querySelector("#doneSound");
let undoSound = document.querySelector("#undoSound");
let deleteSound = document.querySelector("#deleteSound");
let arrayTasks = [];
console.log(doneSound);

//Get Tasks saved From LocaleStorage After Page Loading
if (localStorage.getItem("Task")) {
  arrayTasks = JSON.parse(localStorage.getItem("Task"));
}
//Trigger Function For Get Tasks From LocaleStorage
getFromLocalestorage();

form.addEventListener("submit", (submit) => {
  submit.preventDefault();
  if (typeTask.value !== "") {
    //Push Tasks To Empty ArrayTasks
    pushTasks(typeTask.value);

    //This For Clear Contanet After click Add Task
    typeTask.value = "";
  }
});

function pushTasks(task) {
  //create object to store tasks
  let data = {
    id: Date.now(),
    title: task,
  };

  //Push Data task to Empty array
  arrayTasks.push(data);

  //Trigger Function For Create Tasks Container
  createDiva(arrayTasks);

  //Trigger Function To Save Tasks In LocaleStorage
  addToLocaleStorage(arrayTasks);
}

function createDiva(arrayTasks) {
  tasksContainer.innerHTML = "";
  arrayTasks.forEach((task) => {
    let newTask = document.createElement("div");
    newTask.className = "newTask";
    newTask.setAttribute("data-name", task.id);
    tasksContainer.appendChild(newTask);
    console.log(newTask);

    //create Input for content task
    let taskContent = document.createElement("span");
    taskContent.className = "taskContent";
    taskContent.innerText = task.title;
    newTask.appendChild(taskContent);

    // Create done Button For done tasks Content
    let done = document.createElement("span");
    done.className = "done";
    done.innerText = "Done";
    newTask.appendChild(done);
    done.addEventListener("click", (e) => {
      e.target.parentElement.classList.toggle("active");
      if (newTask.classList.contains("active")) {
        deletTasksFromLocalStorage(
          e.target.parentElement.getAttribute("data-name")
        );
        done.innerText = "Undo";
        taskContent.classList.add("active");
        doneSound.play();
      } else {
        undoSound.play();
        done.innerText = "Done";
        taskContent.classList.remove("active");
        addToLocaleStorage(arrayTasks);
      }
    });

    //Create Delete Button
    let delet = document.createElement("span");
    delet.className = "delet";
    delet.innerText = "Delete";
    newTask.appendChild(delet);

    //Trigger Delete Click
    delet.addEventListener("click", (e) => {
      e.currentTarget.parentElement.remove();
      deleteSound.play();

      // Trigger Function For Delete Task From LocaleStorage
      deletTasksFromLocalStorage(
        e.target.parentElement.getAttribute("data-name")
      );
    });

    let clearAll = document.createElement("input");
    clearAll.type = "submit";
    clearAll.value = "Clear All";
    clearAll.className = "clearAll";
    tasksContainer.appendChild(clearAll);
    if (newTask.innerHTML != "") {
      clearAll.style.display = "block";
    } else {
      clearAll.style.display = "none";
    }
    clearAll.addEventListener("click", (e) => {
      deleteSound.play();
      window.localStorage.removeItem("Task");
      tasksContainer.innerHTML = "";
    });
  });
}

//Add Tasks To LocaleStorage
function addToLocaleStorage(arrayTasks) {
  window.localStorage.setItem("Task", JSON.stringify(arrayTasks));
}

// Get Tasks From LocaleStorage Saved
function getFromLocalestorage() {
  let data = window.localStorage.getItem("Task");
  if (data) {
    let tasks = JSON.parse(data);

    createDiva(tasks);
  }
}

// Function For Delte Tasks from localeStorage
function deletTasksFromLocalStorage(taskId) {
  arrayTasks = arrayTasks.filter((task) => task.id != taskId);
  addToLocaleStorage(arrayTasks);
}

// ======================End To Do List======================
