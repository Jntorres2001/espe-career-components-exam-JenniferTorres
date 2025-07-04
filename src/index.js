import "./components/espe-header.js";
import "./components/espe-list.js";
import "./components/espe-item.js";
import "./components/espe-form.js";
import "./components/espe-detail.js";
import '../css/styles.css'; 

let tasks = [
    {
        id: 1,
        name: 'Comprar ropa',
        notes: 'ropa de invierno',
        time: '10:00',
        priority: 'alta',
        date: 'hoy',
        completed: false
    },
    {
        id: 2,
        name: 'Ver televisión',
        notes: '30 minutos de novelas',
        time: '18:00',
        priority: 'media',
        date: 'hoy',
        completed: false
    },
    {
        id: 3,
        name: 'Comprar de frutas',
        notes: 'fresa, manzana, uva y frambuesa',
        time: '15:30',
        priority: 'baja',
        date: 'mañana',
        completed: false
    },
];

let theme = 'dark';
let currentView = 'fecha'; 

// Referencias a los componentes con IDs correctos
const header = document.getElementById('header');
const espeList = document.getElementById('espeList');
const espeForm = document.getElementById('espeForm');
const espeDetail = document.getElementById('espeDetail');
const tabFecha = document.getElementById('tab-fecha');
const tabPrioridad = document.getElementById('tab-prioridad');

// Inicializar estado
espeList.tasks = tasks;
espeList.theme = theme;
header.theme = theme;
espeForm.theme = theme;
espeDetail.theme = theme;

// Manejar cambio de tema
header.addEventListener('theme-toggle', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    header.theme = theme;
    espeList.theme = theme;
    espeForm.theme = theme;
    espeDetail.theme = theme;
});

// Manejar eventos del espeList
espeList.addEventListener('task-deleted', (e) => {
    const id = e.detail.task.id;
    tasks = tasks.filter(t => t.id !== id);
    espeList.tasks = [...tasks];
});

espeList.addEventListener('task-edit', (e) => {
    espeForm.task = e.detail.task;
    espeForm.open = true;
});

espeList.addEventListener('add-task-requested', () => {
    espeForm.task = null; // Nueva tarea
    espeForm.open = true;
});

espeList.addEventListener('task-selected', (e) => {
    espeDetail.task = e.detail.task;
    espeDetail.open = true;
});

// Manejar eventos del formulario
espeForm.addEventListener('close', () => {
    espeForm.open = false;
});

espeForm.addEventListener('save-task', (e) => {
    const taskData = e.detail;
    
    if (taskData.id) {
        // Editar tarea existente
        const index = tasks.findIndex(t => t.id === taskData.id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...taskData };
        }
    } else {
        // Nueva tarea
        const newTask = {
            ...taskData,
            id: Date.now(), // ID único basado en timestamp
            completed: false
        };
        tasks.push(newTask);
    }
    
    espeList.tasks = [...tasks];
    espeForm.open = false;
});

// Manejar eventos del detalle de tarea
espeDetail.addEventListener('close', () => {
    espeDetail.open = false;
});

espeDetail.addEventListener('edit-task', (e) => {
    espeDetail.open = false;
    espeForm.task = e.detail.task;
    espeForm.open = true;
});

espeDetail.addEventListener('task-completed', (e) => {
    const task = e.detail.task;
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
        tasks[index].completed = true;
        espeList.tasks = [...tasks];
    }
});

// Manejar pestañas de vista
tabFecha.addEventListener('click', (e) => {
    e.preventDefault();
    currentView = 'fecha';
    tabFecha.classList.add('active');
    tabPrioridad.classList.remove('active');
    espeList.view = 'fecha';
});

tabPrioridad.addEventListener('click', (e) => {
    e.preventDefault();
    currentView = 'prioridad';
    tabPrioridad.classList.add('active');
    tabFecha.classList.remove('active');
    espeList.view = 'prioridad';
});
