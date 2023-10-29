import styles from './Result.module.css';

import { Component } from 'react';
import { Person } from '../../interfaces/SWApi';
import Spinner from '../Spinner/Spinner';

type ResultProps = {
  isLoading: boolean;
  data: Person[];
};

export class Result extends Component<ResultProps> {
  render() {
    const { isLoading, data } = this.props;
    if (isLoading) return <Spinner />;
    if (!data.length) return <p className={styles.title}>No results found</p>;

    return (
      <section className={styles.wrapper}>
        <h1 className={styles.title}>Search Results</h1>
        <ul className={styles.results}>
          {data.length > 0 &&
            data.map((person: Person) => {
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
}
