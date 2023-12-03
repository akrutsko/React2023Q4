import Forms from './Forms/Forms';
import styles from './Main.module.css';

import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <>
      <main>
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
      </main>
      <div>
        <Forms />
      </div>
    </>
  );
}
