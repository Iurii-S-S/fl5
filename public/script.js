document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const taskData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
        dueDate: document.getElementById('dueDate').value,
        reminder: document.getElementById('reminder').value,
    };

    await createTask(taskData);
    loadTasks();
});

async function createTask(taskData) {
    const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        console.error('Ошибка при создании задачи');
    }
}

async function loadTasks() {
    const response = await fetch('http://localhost:5000/api/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${task.title}</strong> - ${task.status}
            <p>${task.description}</p>
            <p>Срок: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Не установлен'}</p>
            <p>Напоминание: ${task.reminder ? new Date(task.reminder).toLocaleDateString() : 'Не установлено'}</p>
            <button onclick="deleteTask('${task._id}')">Удалить</button>
        `;
        taskList.appendChild(li);
    });
}

async function deleteTask(taskId) {
    await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
    });
    loadTasks();
}

// Загрузка задач при инициализации
loadTasks();

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        alert('Пользователь зарегистрирован');
    } else {
        alert('Ошибка регистрации');
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Вход выполнен');
        loadTasks(); // Загрузить задачи после входа
    } else {
        alert('Ошибка входа');
    }
});