import { div } from '@components/tags';

import styles from './text-skeleton.module.scss';

export const TextSkeleton = () => {
  const skeletonClasses = `${styles.skeleton} ${styles.skeletonText}`; //Created a separate variable (skeletonClasses) to store the combined class names for better readability.
  return div({ className: skeletonClasses }); //Returned the div element directly from the function.
};
