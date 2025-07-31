import type { Todo, FilterStatus } from "./types";

export default class TodoStore {
  private todos: Todo[] = [];

  addTodo(title: string): Todo {
    const newTodo: Todo = {
      id: this.todos.length + 1, // Simple ID generation
      title,
      completed: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
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
