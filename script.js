// Functions for local storage handling
function saveToLocalStorage(todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todoList')) || [];
}

// Function to add a new item
function addItem() {
    const name = document.getElementById('item-name').value;
    const date = document.getElementById('item-date').value;
    const priority = document.getElementById('priority').value;
    
    if (name && date && priority) {
        const newItem = { name, date, priority, completed: false };
        const todoList = getFromLocalStorage();
        todoList.push(newItem);
        saveToLocalStorage(todoList);
        renderTasks();
    } else {
        alert('Please fill out all fields.');
    }
}
// Function to render tasks
function renderTasks() {
    const todoList = getFromLocalStorage();
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const todayTasks = [];
    const futureTasks = [];
    const completedTasks = [];

    todoList.forEach((item, index) => {
        const taskItem = `<div class="todo-item${item.completed ? ' completed' : ''}${isPastDeadline(item.date) && !item.completed ? ' past-deadline' : ''}">
            <span class="task-details">${item.name}</span>
           <span class="task-details">${item.date}</span>
           <span class="task-details">${item.priority}</span>
            <div>
                <button onclick="toggleCompletion(${index})" class="completed-btn">${item.completed ? '' : '<img src="assets/check-circle.svg" alt="completed">'}</button>
                <button onclick="deleteItem(${index})" class="delete-btn"><img src="assets/trash-black.svg" alt="Delete"></button>
            </div>
        </div>`;

        if (item.completed) {
            completedTasks.push(taskItem);
        } else if (item.date === today) {
            todayTasks.push(taskItem);
        } else {
            futureTasks.push(taskItem);
        }
    });

    document.getElementById('today-tasks').innerHTML = todayTasks.join('');
    document.getElementById('future-tasks').innerHTML = futureTasks.join('');
    document.getElementById('completed-tasks').innerHTML = completedTasks.join('');
}

// Function to check if deadline is past
function isPastDeadline(deadline) {
    const today = new Date().toISOString().split('T')[0];
    return deadline < today;
}

// Function to delete a task
function deleteItem(index) {
    const todoList = getFromLocalStorage();
    todoList.splice(index, 1);
    saveToLocalStorage(todoList);
    renderTasks();
}

// Function to mark a task as completed or not completed
function toggleCompletion(index) {
    const todoList = getFromLocalStorage();
    todoList[index].completed = !todoList[index].completed;
    saveToLocalStorage(todoList);
    renderTasks();
}

// Initial rendering on page load
window.onload = renderTasks;
