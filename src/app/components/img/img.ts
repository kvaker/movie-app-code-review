import { img } from '@components/tags';

import styles from './img.module.scss';

interface Props {
  src?: string;
  alt?: string;
  className?: string;
}
//Instead of creating an Image element dynamically, you can directly set the src, alt, and className properties on an existing img element.
//Avoid unnecessary complexity by directly manipulating the existing DOM elements.
//The type casting in the code (as unknown as number as unknown as string) seems unnecessary and confusing. It’s better to avoid such convoluted type conversions.
export const ImageWithPlaceholder = ({ src = '', alt = '', className = '' }: Props) => {
  const image = img({ src, alt, className: `${styles.placeholder} ${className}` });

  // Remove the placeholder class when the image loads
  image.onload = () => {
    image.classList.remove(styles.placeholder);
  };

  return image;
};
