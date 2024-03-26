import type { BaseComponent } from '@components/base-component';

import { PageWrapper } from './page';

class App {
  constructor(
    private pageWrapper: BaseComponent,
    private root: HTMLElement,
  ) {}
//1. I introduced the `appendPageWrapper()` method, which encapsulates the common logic of appending the `pageWrapper` node to the `root`
//2. The method checks if `pageWrapper` is initialized before appending
  private appendPageWrapper(): void {
    if (!this.pageWrapper) {
      console.error('Page wrapper is not initialized.');
      return;
    }

    this.root.append(this.pageWrapper.getNode());
  }

  public start(): void {
    this.appendPageWrapper();
  }

  public stop(): void {
    this.appendPageWrapper();
  }

  public pause(): void {
    this.appendPageWrapper();
  }
}
//3. Error handling is added for cases where `document.querySelector<HTMLDivElement>('#app')` returns `null`
//4. Descriptive error messages are logged to the console for debugging purposes
const appRoot = document.querySelector<HTMLDivElement>('#app');
if (!appRoot) {
  console.error('App root element not found.');
} else {
  const app = new App(PageWrapper(), appRoot);
  app.start();
  app.stop();
  app.pause();
}
