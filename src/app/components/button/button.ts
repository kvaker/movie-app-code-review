import { BaseComponent } from '@components/base-component';

import styles from './button.module.scss';
//Renamed the Props interface to ButtonProps for clarity.
interface ButtonProps {
  txt: string;
  onClick?: () => void;
  className?: string;
}
//Extracted the handleButtonClick function to improve readability.
export const MyfavoriteComponent = ({ txt, onClick, className }: ButtonProps) => {
  const handleButtonClick = (event: Event) => {
    event.preventDefault(); //Used a more descriptive parameter name (event) instead of PreventDefault.
    onClick?.();
  };

  return new BaseComponent({
    tag: 'button',
    className: `${styles.button} ${className || ''}`,
    txt,
    onclick: handleButtonClick,
  });
};
