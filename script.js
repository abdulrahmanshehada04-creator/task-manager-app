// DOM Elements
const newTaskInput = document.getElementById('newTaskInput');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const taskList = document.getElementById('taskList');

// Array to store tasks
let tasks = [];

// Add new task
addBtn.addEventListener('click', () => {
  const taskText = newTaskInput.value.trim();
  if (taskText === '') return;

  const newTask = {
    id: Date.now(),
    title: taskText,
    isCompleted: false
  };

  tasks.push(newTask);
  renderTasks();
  newTaskInput.value = '';
});

// Toggle completion status
function toggleComplete(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
  );
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Render all tasks
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.isCompleted ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.isCompleted;
    checkbox.addEventListener('change', () => toggleComplete(task.id));

    const span = document.createElement('span');
    span.textContent = task.title;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Clear all completed tasks
clearBtn.addEventListener('click', () => {
  tasks = tasks.filter(task => !task.isCompleted);
  renderTasks();
});

// Initial render
renderTasks();
