import TodoApp from './todoModule.js';

let updatingTodoId = null;

const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];
const updateInput = document.getElementById('todo-update-input');
const updateBtn = document.getElementById('update-todo');

const renderTodos = () => {
  todoList.innerHTML = '';  // Clear the list
  TodoApp.todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.className = todo.completed ? 'completed' : '';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      TodoApp.deleteTodo(todo.id).then(renderTodos);
    });

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.className = 'update-button';
    updateButton.addEventListener('click', (e) => {
      e.stopPropagation();
      updatingTodoId = todo.id;
      updateInput.value = todo.text;
      modal.style.display = "block";
    });

    li.appendChild(deleteButton);
    li.appendChild(updateButton);
    
    li.addEventListener('click', (event) => {
      if (event.target !== deleteButton && event.target !== updateButton) {
        TodoApp.toggleTodo(todo.id).then(renderTodos);
      }
    });

    todoList.append(li);
  });
};

addTodoButton.addEventListener('click', () => {
  TodoApp.createTodo(todoInput.value).then(() => {
    todoInput.value = '';
    renderTodos();
  });
});

updateBtn.onclick = function() {
  TodoApp.updateTodo(updatingTodoId, updateInput.value).then(() => {
    modal.style.display = "none";
    updateInput.value = "";
    renderTodos();
  });
};

closeBtn.onclick = function() {
  modal.style.display = "none";
}

renderTodos();
