let tasks = (JSON.parse(localStorage.getItem('tasks')) || []).filter(task => !task.completed);

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    renderTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();

        // Clear the input field
        taskInput.value = "";
    }
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function showIncompleteTasks() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

function showAllTasks() {
    tasks = (JSON.parse(localStorage.getItem('tasks')) || []).filter(task => !task.completed);
    renderTasks();
}

function renderTasks() {
    var todoList = document.getElementById("todoList");
    clearList(todoList);

    tasks.forEach((task, index) => {
        var newTask = document.createElement("li");
        newTask.innerHTML = `
            <span>${task.text}</span>
            <button class="check-btn" onclick="completeTask(${index})">✓</button>
            <button class="delete-btn" onclick="deleteTask(${index})">X</button>
        `;
        if (task.completed) {
            newTask.classList.add('checked');
        }
        todoList.appendChild(newTask);
    });
}

function clearList(list) {
    list.innerHTML = "";
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
