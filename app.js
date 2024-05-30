let taskName = '';
let taskAutor= '';

const arrayTask = []

const formValues = {
    'taskName': '',
    'taskAutor': '',
}

const taskNameInputElement = document.getElementById('task');
const taskAutorInputElement = document.getElementById('autor');
const taskFormElement = document.getElementById('formulario');
const containerListElement = document.getElementById('containerList');
const containerMessageElement = document.getElementById('message');

const clearInputStyle = (keyItem) => {
    switch (keyItem) {
        case 'taskName': taskNameInputElement.style.borderColor = 'black'; break;
        default :  taskAutorInputElement.style.borderColor = 'black'; break;
    }
}

const taskChangeValues = (e, keyItem) => {
    clearInputStyle(keyItem)
    formValues[keyItem] = e.target.value
}

const validateInfo = () => {
    console.log({formValues})

   return Object.values(formValues).every(value => !!value && value.trim() !== '' );
}

const clearForm = () => {
    console.log('clear')
    taskFormElement.reset()
    formValues.taskName = '';
    formValues.taskAutor = '';
    containerMessageElement.innerHTML = '';
}


const renderTaskList = () => {
    console.log({arrayTask})
    containerListElement.innerHTML = '';
    if(arrayTask.length === 0) {
        containerListElement.innerHTML = '<p>No se encuentran listados de tareas</p>';
    } else {
        const ol = document.createElement('ol');
        arrayTask.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = `Task: ${task.taskName}, Author: ${task.taskAutor}`;
            ol.appendChild(li);
        });
        containerListElement.appendChild(ol);
    }
}


const updateValues = () => {
    arrayTask.push({...formValues})
    renderTaskList()
}

const sendErrorMessage = () => {
    const {taskName, taskAutor} = formValues;
    if(!taskName) {
        taskNameInputElement.style.borderColor= 'red'
    }
    if(!taskAutor) {
        taskAutorInputElement.style.borderColor= 'red'
    }

    containerMessageElement.innerHTML = '<p>Debes llenar todas las casillas</p>';
} 

const submitElements = (e) => {
    e.preventDefault();
    const isValid = validateInfo();
    if(isValid){
        updateValues()
        clearForm()
    } else {
        sendErrorMessage()
    }
}


taskNameInputElement.addEventListener('input', (e)=> taskChangeValues(e, 'taskName') )
taskAutorInputElement.addEventListener('input', (e)=> taskChangeValues(e, 'taskAutor') )
taskFormElement.addEventListener('submit', submitElements)

renderTaskList()









