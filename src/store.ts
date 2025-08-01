import type { Todo, FilterStatus } from "./types";
import { GenericStorage } from "./generic-storage";

// Key for localStorage
const STORAGE_KEY = "todos";
const todoStorage = new GenericStorage<Todo[]>(STORAGE_KEY);

export default class TodoStore {
  private todos: Todo[] = [];

  constructor() {
    this.todos = todoStorage.load() || [];
  }

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: this.todos.length + 1, // Simple ID generation
      title,
      completed: false,
    };
    this.todos.push(newTodo);
    todoStorage.save(this.todos);
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todoStorage.save(this.todos);
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    todoStorage.save(this.todos);
  }

  editTodo(id: number, newTitle: string): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.title = newTitle;
      todoStorage.save(this.todos);
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
}
