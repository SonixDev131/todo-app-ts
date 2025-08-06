export interface Todo {
  id: string; // Changed to string for UUID
  title: string;
  completed: boolean;
  dueDate?: string; // Optional due date
}

export type FilterStatus = "all" | "pending" | "completed";
