document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoInput = document.getElementById('todo-input');
  
    const apiBaseUrl = 'http://localhost:3000';
  
    // Function to fetch and display all todos
    function fetchTodos() {
      fetch(`${apiBaseUrl}/todos`)
        .then(response => response.json())
        .then(todos => {
          todoList.innerHTML = ''; // Clear current list
          todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            li.className = todo.completed ? 'completed' : '';
  
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => deleteTodo(todo.id);
  
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
          });
        });
    }
  
    // Function to add a new todo
    function addTodo() {
      const text = todoInput.value.trim();
      if (text !== '') {
        fetch(`${apiBaseUrl}/todos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text })
        })
        .then(response => response.json())
        .then(todo => {
          fetchTodos(); // Refresh the list
          todoInput.value = ''; // Clear the input field
        });
      }
    }
  
    // Function to delete a todo
    function deleteTodo(id) {
      fetch(`${apiBaseUrl}/todos/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        fetchTodos(); // Refresh the list after deletion
      });
    }
  
    // Event listener for adding a new todo
    addTodoBtn.addEventListener('click', addTodo);
  
    // Fetch todos on page load
    fetchTodos();
  });
  