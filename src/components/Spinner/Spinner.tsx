import styles from './Spinner.module.css';

function Spinner() {
  return (
    <div data-testid="spinner" className={styles.wrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Spinner;
