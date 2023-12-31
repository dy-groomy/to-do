document.addEventListener("DOMContentLoaded", loadTodosFromStorage);

const addButton = document.getElementById('addNewTodos')
let storageIndex = loadIndex();


/** Todo 추가 버튼 클릭 */
addButton.onclick = function addTodo() {

    const value = prompt('할 일을 추가하세요:');
    const inputValue = value.trim();

    if (inputValue === '') {
        alert('장난?');
        return;
    }
    let id = storageIndex;

    const li = createTodoElement(inputValue,id);
    document.getElementById('todoList').appendChild(li);

    // Save to local storage
    saveTodoInStorage(inputValue,id);
    storageIndex++;
}


/** Todo 추가 */
function createTodoElement(value, index ,comp = false) {
    const li = document.createElement('li');

    const identifier = index;
            
    /** Todo 이름 생성 */
    const taskName =  document.createElement('div');
    taskName.classList.add('taskName');
    taskName.textContent = value;
    if(comp){
        taskName.classList.add('lineThrough');
    }

    /**checkbox 추가 */
    const checkBox = document.createElement('input');
    checkBox.classList.add('checkbox');
    checkBox.type = 'checkbox';
    checkBox.checked = comp;
    checkBox.onchange = function(){
        taskName.classList.toggle('lineThrough',checkBox.checked);
        saveCheckboxDataInStorage(identifier, checkBox.checked)
    };
    
    /** Todo 삭제 버튼 추가 */ 
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        li.remove();
        removeTodoFromStorage(identifier);
    };

    /** Todo 편집 버튼 추가 */ 
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.textContent ='Edit';
    editBtn.onclick = function() {
        const newValue = prompt('Edit your task:', taskName.textContent);
        
        if (newValue && newValue.trim() !== '') {
            const oldValue = taskName.textContent;
            taskName.textContent = newValue.trim();
            
            updateTodoInStorage(identifier, newValue.trim());
        }
    };

    li.appendChild(taskName);
    li.appendChild(checkBox);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);    
    
    return li;
}

/**
 * local storage에 todo 저장
 * @param {*} todo @type-[string] 할일 목록
 * @param {*} id @type-[Date] 식별자
 * @param {*} comp @type-[bool] 체크박스 여부
 */
function saveTodoInStorage(todo, id, comp = false) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push({text:todo, index: id, completed: comp});
    localStorage.setItem('todos', JSON.stringify(todos));
}

/** local storage에서 data load */
function loadTodosFromStorage() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todoObj) {
        const li = createTodoElement(todoObj.text, todoObj.index,todoObj.completed);
        document.getElementById('todoList').appendChild(li);
    });
}


function loadIndex(){
    let id;
    let todos = JSON.parse(localStorage.getItem('todos'));
    if(localStorage.getItem('todos') === null){
        id = 1;
    }
    else{
        id = todos.at(-1).index+1;
    }
    return id;
}

/**
 * local storage에서 todo 제거
 * @param {*} id @type-[number] 식별자
 */
function removeTodoFromStorage(id) {
    const todos = JSON.parse(localStorage.getItem('todos')).filter(t=>t.index!==id);
    localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * local storage에 있는 todo 편집
 * @param {*} id @type-[number] 식별자
 * @param {*} newValue @type[string] 할일 목록 변경사항
 */
function updateTodoInStorage(id, newValue) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const todoObj = todos.find(t=>t.index==id);
  if (todoObj) {    
    todoObj.text = newValue;
  }
  localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * local storage에 checkbox data 저장
 * @param {*} id @type-[number] 식별자
 * @param {*} comp @type-[bool] 체크박스 여부
 */
function saveCheckboxDataInStorage(id, completed) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const todoObj = todos.find(t => t.index === id);
    if (todoObj) {
        todoObj.completed = completed;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}