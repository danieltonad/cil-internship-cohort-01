var todos = [], list = [], track_todo_id = 0, 
update_id = 0,
addScreen = document.querySelector(".add-screen"),
newTask = document.querySelector("#newTask"),
addTask = document.querySelector("#addTask"),
newTodo = document.querySelector("#todo-info"),
display = document.querySelector(".tasks"),
updateTask = document.querySelector("#updateTask")




const showAddScreen = () => {
    addScreen.style.display = "block"
    updateTask.style.display = "none"
    addTask.style.display = "block"
}

const showUpdateScreen = (id) => {
    addScreen.style.display = "block"
    updateTask.style.display = "block"
    addTask.style.display = "none"
    console.log(id)
    newTodo.value = todos[id-1].info
    update_id = id;
    console.log(todos);
}

const hideAddScreen = () => {
    addScreen.style.display = "none"
    updateTask.style.display = "block"
}

const hideUpdateScreen = () => {
    addScreen.style.display = "none"
    updateTask.style.display = "none"
    clearInputs();
}

const addTodoList = () => {
    id = ++track_todo_id
    let info = newTodo.value
    let todo_temp = {id: id, info: info}
    todos.push(todo_temp) //add todo tasks to array
    migrateList(todos)
    renderTodos()
    clearInputs()
    clearList()
    hideAddScreen() // hide screen
}

const clearInputs = () => {
    newTodo.value = "";
}

const clearList = () => {
    list = []
}

const migrateList = (arr) => {
    arr.forEach(task => {
        let newInfo = `
            <div class="for-each-task">
                    <div class="task-info">
                        ${task.info}
                    </div>
                    <div class="task-btn-close">
                        <span class="edit" onclick='showUpdateScreen(this.id)' id='${ task.id }'>
                            <i class="fa fa-edit fa-1x"></i>
                        </span>
                        &nbsp;
                        <span class="close" onclick='trackTask(this.id)' id='${ task.id }'> 
                            <i class="fa fa-times fa-1x"></i>
                        </span>

                        
                    </div>
                </div>
            `
        list.push(newInfo)
    });
}

const refactorTaskID = ()=> {
    refactored = 0;
    for(let i = 0; i < todos.length; i++) {
        if (todos[i].id == i) {
            refactored += 1
        }  
        else{
            refactored -= 1
        }
        
    }

    if (refactored < todos.length){
        for (let i = 0; i < todos.length; i++) {
        todos[i].id = i + 1
        }
    }   
}

const trackTask = (taskId) => {
    updatedTodos = todos.filter(obj => obj.id != taskId)
    todos = updatedTodos
    refactorTaskID()
    migrateList(todos)
    renderTodos()
    clearList()
    emptyTodosCheck()
}

const renderTodos = () => {
    display.innerHTML = ""; //intialize task lists
    // append tasks
    list.forEach(tasks => {
        display.innerHTML += tasks
    });
}

const emptyTodosCheck = () =>{
    if (todos.length < 1)
        display.innerHTML = "No Avilable Todo List"
}

const updateTodo = () => {
     todos[update_id - 1].info = newTodo.value
     update_id = 0
    refactorTaskID()
     migrateList(todos)
     hideUpdateScreen()
     renderTodos()
     clearList()
     emptyTodosCheck()
 }

newTask.addEventListener("click", showAddScreen)
addTask.addEventListener("click", addTodoList)
updateTask.addEventListener("click", updateTodo)
emptyTodosCheck()