import styles from './Main.module.css';

import { Link } from 'react-router-dom';
import Forms from './Forms/Forms';

export default function Main() {
  return (
    <>
      <header>
        <button>
          <Link to="/html-form" className={styles['button-link']}>
            HTML Form
          </Link>
        </button>
        <button>
          <Link to="/react-hook-form" className={styles['button-link']}>
            React Hook Form
          </Link>
        </button>
      </header>
      <main>
        <Forms />
      </main>
    </>
  );
}
