document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');

    const task = {
        text: taskInput.value,
        priority: priorityInput.value,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value = '';
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks
        .sort((a, b) => (a.priority === 'high' ? -1 : a.priority === 'medium' && b.priority === 'low' ? -1 : 1))
        .forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';

            const taskText = document.createElement('span');
            taskText.textContent = `${task.text} (${task.priority})`;

            const buttons = document.createElement('div');
            buttons.className = 'task-buttons';

            const completeButton = document.createElement('button');
            completeButton.className = 'complete-button';
            completeButton.textContent = 'Complete';
            completeButton.onclick = () => toggleComplete(index);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteTask(index);

            buttons.appendChild(completeButton);
            buttons.appendChild(deleteButton);

            taskItem.appendChild(taskText);
            taskItem.appendChild(buttons);
            taskList.appendChild(taskItem);
        });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}
