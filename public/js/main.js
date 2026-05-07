const userSelect = document.getElementById('userSelect');
const welcomeText = document.getElementById('welcomeText');
const userEmail = document.getElementById('userEmail');
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskCount = document.getElementById('taskCount');

let currentUser = null;

// Cargar usuarios al iniciar
async function loadUsers() {
    try {
        const res = await fetch('/api/users');
        const users = await res.json();
        
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            option.dataset.email = user.email;
            userSelect.appendChild(option);
        });
    } catch (err) {
        console.error('Error cargando usuarios:', err);
    }
}

// Cargar tareas del usuario seleccionado
async function loadTasks(userId) {
    try {
        const res = await fetch(`/api/users/${userId}/tasks`);
        const tasks = await res.json();
        
        taskList.innerHTML = '';
        taskCount.textContent = tasks.length;

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span>${task.title}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Eliminar</button>
            `;
            taskList.appendChild(li);
        });
    } catch (err) {
        console.error('Error cargando tareas:', err);
    }
}

// Cambiar usuario activo
userSelect.addEventListener('change', (e) => {
    const userId = e.target.value;
    if (!userId) {
        welcomeText.textContent = 'Bienvenido a tu TFG';
        userEmail.textContent = 'Selecciona un perfil para empezar';
        taskList.innerHTML = '';
        taskCount.textContent = '0';
        currentUser = null;
        return;
    }

    const selectedOption = e.target.options[e.target.selectedIndex];
    currentUser = { id: userId, name: selectedOption.textContent };
    welcomeText.textContent = `Hola, ${currentUser.name}`;
    userEmail.textContent = selectedOption.dataset.email;
    
    loadTasks(userId);
});

// Añadir tarea
addTaskBtn.addEventListener('click', async () => {
    const title = taskInput.value.trim();
    if (!currentUser) return alert('Selecciona un usuario primero');
    if (!title) return;

    try {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: currentUser.id, title })
        });

        if (res.ok) {
            taskInput.value = '';
            loadTasks(currentUser.id);
        }
    } catch (err) {
        console.error('Error añadiendo tarea:', err);
    }
});

// Eliminar tarea (definida globalmente para el onclick)
window.deleteTask = async (taskId) => {
    try {
        const res = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
        if (res.ok && currentUser) {
            loadTasks(currentUser.id);
        }
    } catch (err) {
        console.error('Error eliminando tarea:', err);
    }
};

loadUsers();
