const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', function() {
    const taskText = newTaskInput.value;

    if (taskText.trim() === '') {
        alert("Veuillez écrire une tâche !");
        return;
    }

    const taskItem = document.createElement('li');
    const taskCheckbox = document.createElement('input');
    const taskLabel = document.createElement('label');

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Supprimer';
    deleteButton.addEventListener('click', function() {
        taskItem.remove();
    });


    taskCheckbox.type = 'checkbox';
    taskLabel.innerText = taskText;

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskLabel);

    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    newTaskInput.value = '';
});

taskList.addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
    const taskItem = event.target.parentElement;
    taskItem.classList.toggle('completed');
    }
});
