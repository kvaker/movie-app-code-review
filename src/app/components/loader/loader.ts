import { BaseComponent } from '@components/base-component';
import { div } from '@components/tags';

import styles from './loader.module.scss';
//Consistent Naming: Renamed the class to LoaderComponent for clarity.
class LoaderComponent extends BaseComponent {
  private spinner: BaseComponent;//Private Property: Declared spinner as a private property.

  constructor() {
    super({ className: 'grey-modal' });//Simplified Class Names: Removed unnecessary concatenation of class names.
    this.spinner = div({ className: styles.loader });
    this.node.appendChild(this.spinner.getNode());//The append method is replaced with appendChild to add child components.
  }
//Show/Hide Methods: Renamed showShowShow and hideHideHide to show and hide, respectively.
//Consistent Styling: Used consistent styling for the spinner.
//The addClass and removeClass methods are used on the appropriate nodes.
  public show(): void {
    this.node.classList.add('show');
    this.spinner.getNode().classList.add(styles.show);
  }

  public hide(): void {
    this.spinner.getNode().classList.remove(styles.show);
    this.node.classList.remove('show');
  }
}

export const Loader = () => new LoaderComponent();
