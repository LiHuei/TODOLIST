

// display add task
document.getElementById("addbtn").onclick = function() {showAddtask()};

function showAddtask() {    
    $(".todolist").slideToggle();
    $(".todolist").css("display","flex");
}

// Sortable
$( function() {
    $( "#sortable" ).sortable();
  }) ;

//input file onchange listener
$(".todolist").on("change", '[id^=input]', function(e){
    e.stopPropagation();
    let file = $(this)[0].files[0];
    let info = $(this).closest('.editList').find('.fileName');
    document.querySelector(".fileName").style.display = ("inline");
    info.find('.name').text(file.name);
    info.find('.upload-time').text((new Date()).toDateString());
  });

// File and Memo 狀態

// Star

function changeStar(e){
    const parent = document.querySelector(".icon");
    const activeStar = parent.querySelector(".activeStar");
    activeStar.style.display = "block";
    document.querySelector(".star-status").style.background = "#fff2dc";
};
const parent = document.querySelector(".icon");
const activeStar = parent.querySelector(".activeStar");
activeStar.onclick = function(){
    this.style.display = "none";
    document.querySelector(".star-status").style.background = "none";
}

const stars = document.querySelectorAll(".star");
stars.forEach(button => button.addEventListener("click", changeStar));

//  Add task to list
const taskInput = document.querySelector(".editList .text"),
dateInput = document.querySelector("#date"),
timeInput = document.querySelector("#time"),
fileInput = document.querySelector("#input"),
memoInput = document.querySelector("#memo"),
addBtn = document.querySelector("#savebtn"),
editBtn = document.querySelector("#editbtn"),
filters = document.querySelectorAll(".filters div"),
cancel = document.querySelector(".cancel"),
taskBox = document.querySelector(".todos");

let editId;
let isEditedTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("div.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let li = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "my-task") {
            li +=`<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" name="" class="checkbox" id="${id}" ${isCompleted}>
                        <input type="text" name="" class="text ${isCompleted}" placeholder="${todo.name}">
                    </label>
                        <div class="icon">
                            <i class="fa-regular fa-star star"></i>
                            <i class="fa-solid fa-star activeStar"></i>
                            <i onclick="editTask(${id}, '${todo.name}', '${todo.date}', '${todo.time}', '${todo.memo}')" class="fa-solid fa-pen pen"></i>
                        </div>
                        <div class="info" onclick="showActive(this)">
                            <i class="fa-solid fa-calendar-days"><span>${todo.date}</span></i>
                            <i class="fa-regular fa-file"></i>
                            <i class="fa-regular fa-comment-dots"></i>
                        </div>
                </li>`;
            }
        });
    }

    taskBox.innerHTML = li;
}
showTodo("my-task");

function editTask(taskId, taskName, taskDate, taskTime, taskMemo) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
    dateInput.value = taskDate;
    timeInput.value = taskTime;
    memoInput.value = taskMemo;
    editBtn.style.display = ("block");
    document.querySelector(".todolist").style.display = ("flex");
}

function showActive(selectedTask) {
    console.log(selectedTask);
}

// task left
let lenghtOfUnchecked = $('ul li input:checkbox:not(:checked)').length;
// let lenghtOfChecked = $('ul li input:checkbox:checked').length;
$(function () {
    $("ul li input:checkbox").on("change", function () {
        let lenghtOfUnchecked = $('ul li input:checkbox:not(:checked)').length;
        $(".taskLeft").html(lenghtOfUnchecked+' tasks left');
    });
});
$(".taskLeft").html(lenghtOfUnchecked+' tasks left');
// $(".taskDone").html(lenghtOfChecked+' tasks completed');
    
//Update status
function updateStatus(selectedTask) {
    let taskName = selectedTask.nextElementSibling;

    if(selectedTask.checked) {
        taskName.classList.add("checked");
        // updating the status of selected task to completed
        todos[selectedTask.id].status = "completed";
    }else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "in-progress";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Create a new list when keyup "enter" on task name
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    let userDate = dateInput.value.trim();
    let userTime = timeInput.value.trim();
    let userFile = document.querySelector(".name");
    let userMemo = memoInput.value.trim();
    if(e.key == "Enter" && userTask ) {
        if(!isEditedTask) { // if isEditedTask isn't true
            if(!todos) {
                todos= [];
            }
            let taskInfo = {name: userTask, date: userDate, time: userTime, file: userFile, memo: userMemo, status: "in-progress"};
            todos.push(taskInfo); // adding new task to todos
            document.querySelector(".todolist").style.display = ("none"); // Close add task div after add      
        }else{
            isEditedTask = false;
            todos[editId].name = userTask;
            todos[editId].date = userDate;
            todos[editId].time = userTime;
            todos[editId].file = userFile;
            todos[editId].memo = userMemo;
        }

        taskInput.value = "";
        dateInput.value = "";
        timeInput.value = "";
        fileInput.value = "";
        memoInput.value = "";
        editBtn.style.display = ("none");

        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("my-task");
    }
});

// Create a new list when keyup "enter" on task memo
memoInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    let userDate = dateInput.value.trim();
    let userTime = timeInput.value.trim();
    let userFile = fileInput.value.trim();
    let userMemo = memoInput.value.trim();
    if(e.key == "Enter" && userMemo ) {
        if(!isEditedTask) { // if isEditedTask isn't true
            if(!todos) {
                todos= [];
            }
            let taskInfo = {name: userTask, date: userDate, time: userTime, memo: userMemo, status: "in-progress"};
            todos.push(taskInfo); // adding new task to todos
            document.querySelector(".todolist").style.display = ("none");       
        }else{
            isEditedTask = false;
            todos[editId].name = userTask;
            todos[editId].date = userDate;
            todos[editId].time = userTime;
            todos[editId].file = userFile;
            todos[editId].memo = userMemo;
        }

        taskInput.value = "";
        dateInput.value = "";
        timeInput.value = "";
        fileInput.value = "";
        memoInput.value = "";
        editBtn.style.display = ("none");

        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("my-task");
    }
});

// Create a new list when clicking on the "Add task" button
addBtn.addEventListener("click", () => {
    let userTask = taskInput.value.trim();
    let userDate = dateInput.value.trim();
    let userTime = timeInput.value.trim();
    let userFile = fileInput.value.trim();
    let userMemo = memoInput.value.trim();
    if(!todos) {
        todos= [];
    }        
    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    fileInput.value = "";
    memoInput.value = "";
    document.querySelector(".todolist").style.display = ("none");

    let taskInfo = {name: userTask, date: userDate, time: userTime, file: userFile, memo: userMemo, status: "in-progress"};
    todos.push(taskInfo); // adding new task to todos    
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("my-task");
});

// Create a new list when clicking on the "Save" button
editBtn.addEventListener("click", () => {
    let userTask = taskInput.value.trim();
    let userDate = dateInput.value.trim();
    let userTime = timeInput.value.trim();
    let userFile = fileInput.value.trim();
    let userMemo = memoInput.value.trim();
    if(!isEditedTask) { // if isEditedTask isn't true
        if(!todos) {
            todos= [];
        }
    }else{
        isEditedTask = false;
        todos[editId].name = userTask;
        todos[editId].date = userDate;
        todos[editId].time = userTime;
        todos[editId].file = userFile;
        todos[editId].memo = userMemo;
    }

    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    fileInput.value = "";
    memoInput.value = "";
    editBtn.style.display = ("none");
    document.querySelector(".todolist").style.display = ("none");

    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("my-task");
});

// Create a new list when clicking on the "cancel" button
cancel.addEventListener("click", () => {
    let userTask = taskInput.value.trim();
    let userDate = dateInput.value.trim();
    let userTime = timeInput.value.trim();
    let userFile = fileInput.value.trim();
    let userMemo = memoInput.value.trim();
    if(!isEditedTask) { // if isEditedTask isn't true
        if(!todos) {
            todos= [];
        }
    }else{
        isEditedTask = false;
        todos[editId].name = userTask;
        todos[editId].date = userDate;
        todos[editId].time = userTime;
        todos[editId].file = userFile;
        todos[editId].memo = userMemo;
    }

    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    fileInput.value = "";
    memoInput.value = "";
    editBtn.style.display = ("none");
    document.querySelector(".todolist").style.display = ("none");
});
