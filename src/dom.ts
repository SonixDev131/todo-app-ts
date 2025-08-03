import type { FilterStatus } from "./types";
import TodoStore from "./store";

export class TodoUI {
  private store: TodoStore;

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
  }

  private setupEvents(): void {
    // Form submission
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = this.input.value.trim();
      if (title) {
        this.store.addTodo(title);
        this.input.value = ""; // Clear input
        this.renderTodos();
      }
    });

    // Filter button clicks (Event delegation)
    document.querySelector(".filters")?.addEventListener("click", (e) => {
      const button = (e.target as HTMLElement).closest("button");
      if (button) {
        const filter = button.dataset.filter as FilterStatus;
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
      `,
      )
      .join("");

    // Add checkbox listeners
    this.list.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const li = checkbox.closest("li");
        if (li) {
          const id = String(li.dataset.id);
          this.store.toggleTodo(id);
          this.renderTodos(filter); // Re-render with the same filter
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
          this.renderTodos(filter); // Re-render with the same filter
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
            li.querySelector("span")?.textContent || "",
          );
          if (newTitle !== null && newTitle.trim() !== "") {
            this.store.editTodo(id, newTitle.trim());
            this.renderTodos(filter); // Re-render with the same filter
          }
        }
      });
    });
  }
}
