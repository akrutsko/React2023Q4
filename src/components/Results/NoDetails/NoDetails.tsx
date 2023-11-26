import styles from './NoDetails.module.css';

import Image from 'next/image';

export default function NoDetails() {
  return (
    <div className={styles['not-found']}>
      <Image
        src="/assets/images/no-person.png"
        alt="no person data"
        width={719}
        height={271}
      />
    </div>
  );
}
