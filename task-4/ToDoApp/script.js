const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task.text, task.completed));

form.addEventListener('submit', e => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        updateLocalStorage();
        addTaskToDOM(taskText, false);
        input.value = '';
    }
});

function addTaskToDOM(taskText, completed) {
    const li = document.createElement('li');
    li.textContent = taskText;
    if (completed) li.classList.add('completed');

   
    li.addEventListener('click', e => {
        if (e.target.tagName !== 'BUTTON') {
            li.classList.toggle('completed');
            updateTaskStatus(taskText, li.classList.contains('completed'));
        }
    });

    
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', e => {
        tasks = tasks.filter(t => t.text !== taskText);
        updateLocalStorage();
        li.remove();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
}


function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(taskText, completed) {
    const task = tasks.find(t => t.text === taskText);
    if (task) {
        task.completed = completed;
        updateLocalStorage();
    }
}
