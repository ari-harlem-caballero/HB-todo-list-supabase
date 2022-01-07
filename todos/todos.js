import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async(e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();

    const data = new FormData(todoForm);
    
    const task = data.get('task');

    await createTodo(task);

    todoForm.reset();

    await displayTodos();
});
// const todo = await getTodos();

// todoForm.textContent = todo;

async function displayTodos() {
    // fetch the todos
    const list = await getTodos();

    todosEl.textContent = '';
    // display the list of todos
    for (let task of list) {
        const taskElem = document.createElement('p');

        taskElem.classList.add('task-item');
        taskElem.textContent = `${task.task}`;

        if (task.complete) {
            taskElem.classList.add('complete');
        } else {
            taskElem.classList.add('incomplete');
            // be sure to give each todo an event listener
            taskElem.addEventListener('click', async() => {
                await completeTodo(task.id);

                displayTodos();
            });
        }

        taskElem.append(todosEl);
    }

    // on click, complete that todo
}

// add an on load listener that fetches and displays todos on load

window.addEventListener('load', async() => {
    await displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async() => {
    // delete all todos
    await deleteAllTodos();
    // then refetch and display the updated list of todos
    await displayTodos();
});
