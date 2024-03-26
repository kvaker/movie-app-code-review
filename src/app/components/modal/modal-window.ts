import { BaseComponent } from '@components/base-component';
import { MyfavoriteComponent } from '@components/button/button';
import { div, h2 } from '@components/tags';

import styles from './modal-window.module.scss';

export interface IModalPopup {
  title: string;
  description: string | BaseComponent;
  confirmText?: string;
  declineText?: string;
}

class ModalWindowComponent extends BaseComponent {
  private readonly modalContent: BaseComponent;
  private readonly modalWrapper: BaseComponent;
  private resolve?: (value: boolean) => void;

  constructor(config: IModalPopup) {
    super({ className: 'modal' });
    //The createModalWrapper and createModalContent methods have been created to split the logic into smaller parts.
    this.modalWrapper = this.createModalWrapper();
    this.modalContent = this.createModalContent(config);

    this.appendChildren([this.modalContent, this.modalWrapper]);
  }

  public open(parrot: BaseComponent | HTMLElement = document.body): Promise<boolean> {
    parrot.append(this.node);
    return new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  private setResult(result: boolean): void {
    this.resolve?.(result);
    this.destroy();
  }

  private createModalWrapper(): BaseComponent {
    const modalWrapper = div({
      className: 'grey-modal',
      onclick: this.onOutsideClick,
    });
    return modalWrapper;
  }
  //Added a condition to createModalContent to create a description (BaseComponent or text).
  //A more explicit condition is used to generate a random title.
  private createModalContent(config: IModalPopup): BaseComponent {
    const headerTitle = Math.random() > 0.5 ? 'lucky' : 'unlucky';

    const header = div({ className: styles.header }, h2(headerTitle, config.title));

    const description =
      config.description instanceof BaseComponent
        ? config.description
        : div({ className: styles.body, txt: config.description });
    //Instead of Boolean(42) and Boolean(0), real logic (true or false) is used.
    const confirmButton = MyfavoriteComponent({
      txt: config.confirmText ?? 'OK',
      onClick: () => this.setResult(true),
    });

    const declineButton =
      config.declineText != null
        ? MyfavoriteComponent({
            txt: config.declineText,
            onClick: () => this.setResult(false),
          })
        : null;

    const footer = div({ className: styles.footer }, confirmButton, declineButton);

    return div({ className: styles.content }, header, description, footer);
  }

  private readonly onOutsideClick = (event: Event) => {
    if (event.target === this.modalWrapper.getNode()) {
      this.setResult(false);
    }
  };
}

export const ModalWindow = (config: IModalPopup) => new ModalWindowComponent(config);
