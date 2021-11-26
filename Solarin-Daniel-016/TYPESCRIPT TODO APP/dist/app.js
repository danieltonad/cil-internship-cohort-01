var todos = [], list = [], track_todo_id = 0, update_id = 0;
var addScreen = document.querySelector(".add-screen"), newTask = document.querySelector("#newTask"), addTask = document.querySelector("#addTask"), newTodo = document.querySelector("#todo-info"), display = document.querySelector(".tasks"), updateTask = document.querySelector("#updateTask");
var showAddScreen = function () {
    addScreen.style.display = "block";
    updateTask.style.display = "none";
    addTask.style.display = "block";
};
var showUpdateScreen = function (id) {
    addScreen.style.display = "block";
    updateTask.style.display = "block";
    addTask.style.display = "none";
    newTodo.value = todos[id - 1].info;
    update_id = id;
};
var hideUpdateScreen = function () {
    addScreen.style.display = "none";
    updateTask.style.display = "none";
    clearInputs();
};
var hideAddScreen = function () {
    addScreen.style.display = "none";
    updateTask.style.display = "block";
};
var addTodoList = function () {
    var id = ++track_todo_id;
    var info = newTodo.value;
    var todo_temp = { id: id, info: info };
    todos.push(todo_temp); //add todo tasks to array
    migrateList(todos);
    renderTodos();
    clearInputs();
    clearList();
    hideAddScreen(); // hide screen
};
var clearInputs = function () {
    newTodo.value = "";
};
var clearList = function () {
    list = [];
};
var migrateList = function (arr) {
    arr.forEach(function (task) {
        var newInfo = "\n            <div class=\"for-each-task\">\n                    <div class=\"task-info\">\n                        " + task.info + "\n                    </div>\n                    <div class=\"task-btn-close\">\n                        <span class=\"edit\" onclick='showUpdateScreen(this.id)' id='" + task.id + "'>\n                            <i class=\"fa fa-edit fa-1x\"></i>\n                        </span>\n                        &nbsp;\n                        <span class=\"close\" onclick='trackTask(this.id)' id='" + task.id + "'>\n                            <i class=\"fa fa-times fa-1x\"></i>\n                        </span>\n\n\n                    </div>\n                </div>\n            ";
        list.push(newInfo);
    });
};
var refactorTaskID = function () {
    var refactored = 0;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == i) {
            refactored += 1;
        }
        else {
            refactored -= 1;
        }
    }
    if (refactored < todos.length) {
        for (var i = 0; i < todos.length; i++) {
            todos[i].id = i + 1;
        }
    }
};
var trackTask = function (taskId) {
    var updatedTodos = todos.filter(function (obj) { return obj.id != taskId; });
    todos = updatedTodos;
    refactorTaskID();
    migrateList(todos);
    renderTodos();
    clearList();
    emptyTodosCheck();
};
var renderTodos = function () {
    display.innerHTML = ""; //intialize task lists
    // append tasks
    list.forEach(function (tasks) {
        display.innerHTML += tasks;
    });
};
var emptyTodosCheck = function () {
    if (todos.length < 1)
        display.innerHTML = "No Avilable Todo List";
};
var updateTodo = function () {
    todos[update_id - 1].info = newTodo.value;
    update_id = 0;
    refactorTaskID();
    migrateList(todos);
    hideUpdateScreen();
    renderTodos();
    clearList();
    emptyTodosCheck();
};
newTask.addEventListener("click", showAddScreen);
addTask.addEventListener("click", addTodoList);
updateTask.addEventListener("click", updateTodo);
emptyTodosCheck();
