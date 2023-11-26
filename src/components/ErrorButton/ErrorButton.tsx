import styles from './ErrorButton.module.css';

import { useState } from 'react';

export default function ErrorButton() {
  const [error, setError] = useState(false);

  const handleClick = () => setError(true);

  if (error) {
    throw new Error(
      'This is a test error triggered by the ErrorButton component.',
    );
  }

  return (
    <button className={styles.errorbtn} onClick={handleClick}>
      throw Error
    </button>
  );
}
