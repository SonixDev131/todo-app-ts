import type { FilterStatus } from "./types";
import TodoStore from "./todo-store";

export class TodoUI {
  private store: TodoStore;
  private currentFilter: FilterStatus = "all";

  private form: HTMLFormElement;
  private input: HTMLInputElement;
  private list: HTMLUListElement;

  constructor(store: TodoStore) {
    this.store = store;

    // Initialize DOM references
    this.form = document.getElementById("todo-form") as HTMLFormElement;
    this.input = document.getElementById("todo-input") as HTMLInputElement;
    this.list = document.getElementById("todo-list") as HTMLUListElement;

    this.setupEvents();
    this.setupStoreEvents(); // ← New: Listen to store events!
    this.renderTodos(); // Initial render
  }

  // NEW: Listen to store events for reactive UI
  private setupStoreEvents(): void {
    // Auto-refresh UI when todos change
    this.store.on("todo:added", () => {
      this.renderTodos(this.currentFilter);
    });

    this.store.on("todo:updated", () => {
      this.renderTodos(this.currentFilter);
    });

    this.store.on("todo:toggled", () => {
      this.renderTodos(this.currentFilter);
    });

    this.store.on("todo:deleted", () => {
      this.renderTodos(this.currentFilter);
    });
  }

  private setupEvents(): void {
    // Form submission
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = this.input.value.trim();
      if (title) {
        this.store.addTodo(title);
        this.input.value = ""; // Clear input
        // No need to call renderTodos() - store event will handle it!
      }
    });

    // Filter button clicks (Event delegation)
    document.querySelector(".filters")?.addEventListener("click", (e) => {
      const button = (e.target as HTMLElement).closest("button");
      if (button) {
        const filter = button.dataset.filter as FilterStatus;
        this.currentFilter = filter; // Track current filter
        this.renderTodos(filter);
      }
    });
  }

  renderTodos(filter: FilterStatus = "all"): void {
    const todos = this.store.getTodos(filter);

    this.list.innerHTML = todos
      .map(
        (todo) => `
        <li class="${todo.completed ? "completed" : ""}" data-id="${todo.id}">
          <input type="checkbox" ${todo.completed ? "checked" : ""}>
          <span>${todo.title}</span>
          <button class="delete">❌</button>
          <button class="edit">✏️</button>
        </li>
      `
      )
      .join("");

    // Add checkbox listeners
    this.list.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const li = checkbox.closest("li");
        if (li) {
          const id = String(li.dataset.id);
          this.store.toggleTodo(id);
          // No need to call renderTodos() - store event will handle it!
        }
      });
    });

    // Add delete button listeners
    this.list.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", () => {
        const li = button.closest("li");
        if (li) {
          const id = String(li.dataset.id);
          this.store.deleteTodo(id);
          // No need to call renderTodos() - store event will handle it!
        }
      });
    });

    this.list.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", () => {
        const li = button.closest("li");
        if (li) {
          const id = String(li.dataset.id);
          const newTitle = prompt(
            "Edit todo title:",
            li.querySelector("span")?.textContent || ""
          );
          if (newTitle !== null && newTitle.trim() !== "") {
            this.store.editTodo(id, newTitle.trim());
            // No need to call renderTodos() - store event will handle it!
          }
        }
      });
    });
  }
}
