export class GenericStorage<T> {
  private key: string;
  private defaultValue?: T;

  constructor(key: string, defaultValue?: T) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  save(data: T): boolean {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(
        `Failed to save data to localStorage under key "${this.key}":`,
        error,
      );
      return false;
    }
  }

  load(): T | null {
    try {
      const data = localStorage.getItem(this.key);
      if (!data) return this.defaultValue ?? null;
      return JSON.parse(data);
    } catch (error) {
      console.error(
        `Failed to load data from localStorage under key "${this.key}":`,
        error,
      );
      return this.defaultValue ?? null;
    }
  }

  exists(): boolean {
    return localStorage.getItem(this.key) !== null;
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
