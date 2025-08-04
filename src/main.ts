import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="container">
      <h1>TypeScript Todo</h1>
      <!-- Input Form -->
      <form id="todo-form">
        <input 
          type="text" 
          id="todo-input" 
          placeholder="Add a new task..." 
          required
        >
        <button type="submit">Add</button>
      </form>

      <!-- Filter Buttons -->
      <div class="filters">
        <button data-filter="all">All</button>
        <button data-filter="pending">Pending</button>
        <button data-filter="completed">Completed</button>
      </div>

      <!-- Todo List -->
      <ul id="todo-list"></ul>
    </div>
  </div>
`;

import TodoStore from "./todo-store";
import { TodoUI } from "./dom";

// Initialize
const store = new TodoStore();
const ui = new TodoUI(store);
ui.renderTodos();
