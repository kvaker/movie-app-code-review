//Improved readability and consistency in code formatting.
export class StorageService<T> {
  private readonly storageKeyPrefix: string; //Made storageKeyPrefix a readonly property.

  constructor(storageKeyPrefix: string) {
    this.storageKeyPrefix = storageKeyPrefix;
  }
  //Removed unnecessary .toString() calls when constructing storage keys.
  private getStorageKey(key: keyof T): string {
    return `${this.storageKeyPrefix}_${key}`;
  }
  //Ensured better type safety by using keyof T directly.
  public saveData<K extends keyof T>(key: K, data: T[K]): void {
    const storageKey = this.getStorageKey(key);
    localStorage.setItem(storageKey, JSON.stringify(data));
  }
  //Simplified the return type of getData to T[K] | null.
  public getData<K extends keyof T>(key: K): T[K] | null {
    const storageKey = this.getStorageKey(key);
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : null;
  }
}

export type LocalStorageState = {
  favoriteMovies: string[];
};

export const localStorageService = new StorageService<LocalStorageState>('movie-app');
