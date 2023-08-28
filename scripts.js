document.addEventListener("DOMContentLoaded", loadTodos);

const addButton = document.getElementById('addNewTodos')
/** Todo 추가 버튼 클릭 */
addButton.onclick = function addTodo() {

    const Value = prompt('할 일을 추가하세요:');
    const inputValue = Value.trim();

    if (inputValue === '') {
        alert('장난?');
        return;
    }

    const li = createTodoElement(inputValue);

    document.getElementById('todoList').appendChild(li);

    // Save to local storage
    saveTodo(inputValue);
    
}

/** Todo 추가 */
function createTodoElement(value) {
    const li = document.createElement('li');

    const checkBox = document.createElement('input');
    checkBox.classList.add('checkbox');


    /** Todo 이름 생성 */
    const taskName =  document.createElement('div');
    taskName.classList.add('taskName');
    taskName.textContent = value;

    /** Todo 삭제 기능 추가 */ 
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        li.remove();
        removeTodoFromStorage(value);
    };

    /** Todo 편집 기능 추가 */ 
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.textContent ='Edit';
    editBtn.onclick = function() {
      const newValue = prompt('Edit your task:', taskName.textContent);
      if (newValue && newValue.trim() !== '') {
          const oldValue = taskName.textContent;
          taskName.textContent = newValue.trim();
          
          updateTodoInStorage(oldValue, newValue.trim());
      }
    };

    li.appendChild(taskName);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
    return li;
}

/** local storage에 todo 저장 */
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

/** local storage에서 todo 제거 */
function removeTodoFromStorage(todo) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const index = todos.indexOf(todo);
    if (index !== -1) {
        todos.splice(index, 1);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}

/** local storage에 있는 todo 편집 */
function updateTodoInStorage(oldValue, newValue) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const index = todos.indexOf(oldValue);
  if (index !== -1) {
      todos[index] = newValue;
  }
  localStorage.setItem('todos', JSON.stringify(todos));
}