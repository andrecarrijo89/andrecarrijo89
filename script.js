// script.js

// Selecionando os elementos do DOM
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Função para carregar as tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Função para salvar as tarefas no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        tasks.push({
            text: taskItem.firstChild.textContent.trim(),
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para criar um elemento de tarefa
function createTaskElement(taskText, completed = false) {
    const newTask = document.createElement('li');
    newTask.textContent = taskText;

    if (completed) {
        newTask.classList.add('completed');
    }

    const actions = document.createElement('div');
    actions.classList.add('task-actions');

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Concluir';
    completeButton.onclick = () => {
        toggleComplete(newTask);
        saveTasks(); // Atualiza o localStorage ao marcar como concluído
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remover';
    deleteButton.onclick = () => {
        deleteTask(newTask);
        saveTasks(); // Atualiza o localStorage ao remover a tarefa
    };

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    newTask.appendChild(actions);

    taskList.appendChild(newTask);
}

// Função para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        createTaskElement(taskText);
        saveTasks(); // Atualiza o localStorage ao adicionar uma tarefa
        taskInput.value = ""; // Limpa o campo de entrada
    }
}

// Função para marcar/desmarcar tarefa como concluída
function toggleComplete(taskItem) {
    taskItem.classList.toggle('completed');
}

// Função para remover uma tarefa
function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
}

// Evento de clique no botão "Adicionar"
addTaskButton.addEventListener('click', addTask);

// Permitir adicionar tarefa pressionando Enter
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Carrega as tarefas ao iniciar a página
loadTasks();

localStorage.clear();
