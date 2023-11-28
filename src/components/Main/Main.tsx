import styles from './Main.module.css';

import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <main>
      <button className={styles.button}>
        <Link to="/html-form" className={styles['button-link']}>
          HTML Form
        </Link>
      </button>
      <button className={styles.button}>
        <Link to="/react-hook-form" className={styles['button-link']}>
          React Hook Form
        </Link>
      </button>
    </main>
  );
}
