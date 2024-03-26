//Improved readability and consistency in code formatting.
export interface Observer<T> {
  update: (data: T) => void;
}
//Removed unnecessary return statements.
export class Observable<T> {
  private observers: Observer<T>[] = [];

  public subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }
  //Simplified the unsubscribe method by directly removing the observer.
  public unsubscribe(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  protected notifyAll(data: T): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }

  public unsubscribeAll(): void {
    this.observers.length = 0;
  }
}
