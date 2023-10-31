import styles from './Result.module.css';

import { Person } from '../../interfaces/SWApi';
import Spinner from '../Spinner/Spinner';

type ResultProps = {
  isLoading: boolean;
  data: Person[];
};

function Result({ isLoading, data }: ResultProps) {
  if (isLoading) return <Spinner />;
  if (!data.length) return <p className={styles.title}>No results found</p>;

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Search Results</h1>
      <ul className={styles.results}>
        {data.map((person: Person) => {
          const { name, birth_year, gender } = person;
          return (
            <li key={person.created.toString()}>
              <p>
                <i>Name:</i> {name}
              </p>
              <p>
                <i>Description:</i> {gender} {birth_year}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Result;
