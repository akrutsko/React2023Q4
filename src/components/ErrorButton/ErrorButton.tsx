import styles from './ErrorButton.module.css';

import { useState } from 'react';

function ErrorButton() {
  const [error, setError] = useState(false);

  const handleClick = () => setError(true);

  if (error) {
    throw new Error('Crashed!');
  }

  return (
    <button className={styles.errorbtn} onClick={handleClick}>
      throw Error
    </button>
  );
}

export default ErrorButton;
