export class LocalStorageService<T extends Record<string, any> = {}> {
  private storage: Storage;

  /**
   * Create a new LocalStorageService instance
   * @param storage The storage to use (localStorage or sessionStorage). Defaults to localStorage.
   */
  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }
  /**
   * Get typed data from localStorage
   * @param key The key to retrieve
   * @returns The typed data or null if not found
   */
  get<K extends keyof T>(key: K): T[K] | null;
  /**
   * Get typed data from localStorage with a default value
   * @param key The key to retrieve
   * @param defaultValue The default value to return if key not found
   * @returns The stored data or the default value
   */
  get<K extends keyof T>(key: K, defaultValue: T[K]): T[K];
  get<K extends keyof T>(key: K, defaultValue?: T[K]): T[K] | null {
    const item = this.storage.getItem(key as string);
    if (item === null) {
      return defaultValue ?? null;
    }
    try {
      return JSON.parse(item) as T[K];
    } catch {
      return defaultValue ?? null;
    }
  }

  /**
   * Set typed data in localStorage
   * @param key The key to set
   * @param value The value to store
   */
  set<K extends keyof T>(key: K, value: T[K]): void {
    this.storage.setItem(key as string, JSON.stringify(value));
  }

  /**
   * Remove an item from localStorage
   * @param key The key to remove
   */
  remove<K extends keyof T>(key: K): void {
    this.storage.removeItem(key as string);
  }

  /**
   * Check if a key exists in localStorage
   * @param key The key to check
   * @returns true if the key exists, false otherwise
   */
  has<K extends keyof T>(key: K): boolean {
    return this.storage.getItem(key as string) !== null;
  }

  /**
   * Clear all localStorage
   */
  clear(): void {
    this.storage.clear();
  }
}
