var taskName = document.getElementById("taskName");
var addBtn = document.getElementById("addBtn");
var taskList = document.querySelector(".tasks");

addBtn.onclick = addTask;

window.onload = loadTasksFromLocalStorage;
function pageContent(task,state)
{
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "task");
    
    var tName = document.createElement("p");
    tName.innerHTML = task;
    newDiv.appendChild(tName);

    var imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "image-container");
    newDiv.appendChild(imgDiv);

    var addImg = document.createElement("img");
    addImg.setAttribute("src", "true.png");
    addImg.setAttribute("onclick", "doneTask(this)");
    addImg.setAttribute("id", "true");
    addImg.setAttribute("alt", "true");
    imgDiv.appendChild(addImg);

    var remImg = document.createElement("img");
    remImg.setAttribute("src", "false.png");
    remImg.setAttribute("onclick", "removeTask(this)");
    remImg.setAttribute("id", "false");
    remImg.setAttribute("alt", "false");
    imgDiv.appendChild(remImg);
    if(state)
    {
        newDiv.style.backgroundColor = "green";
    }
    taskList.appendChild(newDiv); 
}

function addTask() {
    var task = taskName.value;
    pageContent(task,false);
    saveTasksToLocalStorage();
   
}

function doneTask(element) {
    var taskDiv = element.closest(".task");
    taskDiv.style.backgroundColor = "green";
    saveTasksToLocalStorage();
    
}

function removeTask(element) {
    var taskDiv = element.closest(".task");
    taskDiv.remove();
    saveTasksToLocalStorage()
}

function saveTasksToLocalStorage() {
    var tasks = document.querySelectorAll(".task p");
    var taskArray = [];
    var doneTasks=[];
    tasks.forEach(function(task) {
        taskArray.push(task.innerHTML);
        if(task.parentElement.style.backgroundColor == "green")
        {
            doneTasks.push(true);
        }
        else
        {
            doneTasks.push(false);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
}

function loadTasksFromLocalStorage() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var doneTasks = JSON.parse(localStorage.getItem("doneTasks"));
    tasks.forEach(function(task) {
        pageContent(task,doneTasks[tasks.indexOf(task)]);    
    });
}