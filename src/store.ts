import type { Todo, FilterStatus } from "./types";

// Key for localStorage
const STORAGE_KEY = "todos";

export default class TodoStore {
  private todos: Todo[] = [];

  constructor() {
    this.todos = this.loadFromLocalStorage();
  }

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: this.todos.length + 1, // Simple ID generation
      title,
      completed: false,
    };
    this.todos.push(newTodo);
    this.saveToLocalStorage();
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveToLocalStorage();
  }

  editTodo(id: number, newTitle: string): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.title = newTitle;
      this.saveToLocalStorage();
    }
  }

  getTodos(status: FilterStatus = "all"): Todo[] {
    switch (status) {
      case "pending":
        return this.todos.filter((todo) => !todo.completed);
      case "completed":
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
  }

  private loadFromLocalStorage(): Todo[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
