import type { Todo, FilterStatus } from "./types";
import { Repository } from "./repository";
import { EventEmitter } from "./event-emitter";

// Define all events that can happen in our Todo app
interface TodoEvents {
  "todo:added": Todo;
  "todo:updated": Todo;
  "todo:deleted": string; // Just the ID
  "todo:toggled": Todo;
  "filter:changed": FilterStatus;
}

// Key for localStorage
const STORAGE_KEY = "todos";

export default class TodoStore {
  private todoRepository: Repository<Todo>;
  private events: EventEmitter<TodoEvents>;

  constructor() {
    this.todoRepository = new Repository<Todo>(STORAGE_KEY);
    this.events = new EventEmitter<TodoEvents>();
  }

  // Public method to subscribe to events
  on<K extends keyof TodoEvents>(
    event: K,
    handler: (data: TodoEvents[K]) => void,
  ): void {
    this.events.on(event, handler);
  }

  // Public method to unsubscribe from events
  off<K extends keyof TodoEvents>(
    event: K,
    handler: (data: TodoEvents[K]) => void,
  ): void {
    this.events.off(event, handler);
  }

  addTodo(title: string): Todo {
    const todo = this.todoRepository.add({
      title,
      completed: false,
    });
    this.events.emit("todo:added", todo); // Emit event!
    return todo;
  }

  toggleTodo(id: string): Todo | undefined {
    const todo = this.todoRepository.findById(id);
    if (!todo) return undefined;

    const updatedTodo = this.todoRepository.update(id, {
      completed: !todo.completed,
    });

    if (updatedTodo) {
      this.events.emit("todo:toggled", updatedTodo); // Emit event!
    }
    return updatedTodo;
  }

  deleteTodo(id: string): boolean {
    const success = this.todoRepository.delete(id);
    if (success) {
      this.events.emit("todo:deleted", id); // Emit event!
    }
    return success;
  }

  editTodo(id: string, newTitle: string): Todo | undefined {
    const updatedTodo = this.todoRepository.update(id, {
      title: newTitle,
    });

    if (updatedTodo) {
      this.events.emit("todo:updated", updatedTodo); // Emit event!
    }
    return updatedTodo;
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
