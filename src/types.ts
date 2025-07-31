export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string; // Optional due date
}

export type FilterStatus = "all" | "pending" | "completed";
