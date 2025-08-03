import type { Todo, FilterStatus } from "./types";
import { Repository } from "./repository";

// Key for localStorage
const STORAGE_KEY = "todos";

export default class TodoStore {
  private todoRepository: Repository<Todo>;

  constructor() {
    this.todoRepository = new Repository<Todo>(STORAGE_KEY);
  }

  addTodo(title: string): Todo {
    return this.todoRepository.add({
      title,
      completed: false,
    });
  }

  toggleTodo(id: string): Todo | undefined {
    const todo = this.todoRepository.findById(id);
    if (!todo) return undefined;

    return this.todoRepository.update(id, {
      completed: !todo.completed,
    });
  }

  deleteTodo(id: string): boolean {
    return this.todoRepository.delete(id);
  }

  editTodo(id: string, newTitle: string): Todo | undefined {
    return this.todoRepository.update(id, {
      title: newTitle,
    });
  }

  getTodos(status: FilterStatus = "all"): Todo[] {
    switch (status) {
      case "pending":
        return this.todoRepository.filter("completed", false);
      case "completed":
        return this.todoRepository.filter("completed", true);
      default:
        return this.todoRepository.getAll();
    }
  }
}
