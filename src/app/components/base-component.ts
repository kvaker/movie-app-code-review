import { isNotNullable } from '@utils/is-nullable';

export type Props<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'style' | 'dataset' | 'classList' | 'children' | 'tagName'>
> & {
  txt?: string;
  tag?: keyof HTMLElementTagNameMap;
};

export type ElementFnProps<T extends HTMLElement = HTMLElement> = Omit<Props<T>, 'tag'>;

export class BaseComponent<T extends HTMLElement = HTMLElement> {
    protected node: T;
    protected children: BaseComponent[] = [];

    constructor(p: Props<T>, ...children: (BaseComponent | HTMLElement | null)[]) {
      this.createNode(p);
      this.appendChildren(children.filter(isNotNullable));
    }
  //Private Method: Moved the node creation logic into a private method for better readability.
    private createNode(p: Props<T>): void {
      const node = document.createElement(p.tag ?? 'div') as T;
      if (p.txt) {
        node.textContent = p.txt;
      }
      Object.assign(node, p);
      this.node = node;
    }

    public append(child: BaseComponent | HTMLElement): void {
      if (child instanceof BaseComponent) {
        this.children.push(child);
        this.node.append(child.getNode());
      } else {
        this.node.append(child);
      }
    }

    public appendChildren(children: (BaseComponent | HTMLElement | null)[]): void {
      children.filter(isNotNullable).forEach((el) => {
        this.append(el);
      });
    }
  //Type Annotations: Added type annotations for clarity.
    public stc(text: string): void {
      this.node.textContent = text;
    }

    public getNode(): T {
      return this.node;
    }

    public addClass(className: string): void {
      this.node.classList.add(className);
    }

    public toggleClass(className: string): void {
      this.node.classList.toggle(className);
    }

    public removeClass(className: string): void {
      this.node.classList.remove(className);
    }
  //Simplified Child Destruction: Simplified child destruction logic in destroyAllChildren.
    public destroyAllChildren(): void {
      this.children.forEach((child) => {
        child.destroy();
      });
      this.children.length = 0;
    }

    public destroy(): void {
      this.destroyAllChildren();
      this.node.remove();
    }
  }
