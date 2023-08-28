document.addEventListener("DOMContentLoaded", loadTodos);

/**
 * 
 * todoInput으로부터 항목을 가져와서 save
 */
function addTodo() {
    const inputValue = document.getElementById('todoInput').value.trim();

    if (inputValue === '') {
        alert('Please enter a task.');
        return;
    }

    const li = createTodoElement(inputValue);

    document.getElementById('todoList').appendChild(li);

    // Save to local storage
    saveTodo(inputValue);
    
    // Clear the input field
    document.getElementById('todoInput').value = '';
}

function createTodoElement(value) {
    const li = document.createElement('li');
    li.innerText = value;

    /**Add delete functionality */ 
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = function() {
        li.remove();
        removeTodoFromStorage(value);
    };

    li.appendChild(deleteBtn);
    return li;
}

/**
 * 
 * @param {*} todo local storage의 todos에 저장
 */
function saveTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        const li = createTodoElement(todo);
        document.getElementById('todoList').appendChild(li);
    });
}

/**
 * 
 * @param {*} todo local storage의 todos에서 해당 task 삭제
 */
function removeTodoFromStorage(todo) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const index = todos.indexOf(todo);
    if (index !== -1) {
        todos.splice(index, 1);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}