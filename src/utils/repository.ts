import { GenericStorage } from "./generic-storage";
import { v4 as uuidv4 } from "uuid";

export class Repository<T extends { id: string }> {
  private storage: GenericStorage<T[]>;

  constructor(key: string) {
    this.storage = new GenericStorage<T[]>(key, []);
  }

  getAll(): T[] {
    return this.storage.load() || [];
  }

  findById(id: string): T | undefined {
    const items = this.getAll();
    return items.find((item) => item.id === id);
  }

  add(item: Omit<T, "id">): T {
    const items = this.getAll();
    const newItem = {
      ...item,
      id: uuidv4(),
    } as T;

    items.push(newItem);
    this.storage.save(items);
    return newItem;
  }

  // Update an item with partial data
  update(id: string, updates: Partial<T>): T | undefined {
    const items = this.getAll();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) return undefined; // Item not found

    // Merge existing item with updates
    items[index] = { ...items[index], ...updates };
    this.storage.save(items);
    return items[index];
  }

  // Delete an item by ID
  delete(id: string): boolean {
    const items = this.getAll();
    const filteredItems = items.filter((item) => item.id !== id);

    // Check if anything was actually deleted
    if (filteredItems.length === items.length) return false;

    this.storage.save(filteredItems);
    return true;
  }

  // Generic filter method - BONUS!
  filter<K extends keyof T>(property: K, value: T[K]): T[] {
    return this.getAll().filter((item) => item[property] === value);
  }
}
