let todos = [];
let todoID = 1;

const createTodo = (text) => {
  return new Promise((resolve, reject) => {
    if (text) {
      const todo = {
        id: todoID++,
        text: text,
        completed: false
      };
      todos.push(todo);
      resolve();
    } else {
      reject('Invalid todo text');
    }
  });
};

const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      resolve();
    } else {
      reject('Todo not found');
    }
  });
};

const toggleTodo = (id) => {
  return new Promise((resolve, reject) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      resolve();
    } else {
      reject('Todo not found');
    }
  });
};

const updateTodo = (id, text) => {
  return new Promise((resolve, reject) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      todo.text = text;
      resolve();
    } else {
      reject('Todo not found');
    }
  });
};

export default {
  todos,
  createTodo,
  deleteTodo,
  toggleTodo,
  updateTodo
};
