export class GenericStorage<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  save(data: T): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (error) {
      console.error(
        `Failed to save data to localStorage under key "${this.key}":`,
        error,
      );
    }
  }

  load(): T | null {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(
        `Failed to load data from localStorage under key "${this.key}":`,
        error,
      );
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
