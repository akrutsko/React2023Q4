import styles from './Results.module.css';

import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector, usePersons } from '../../hooks';
import { Person } from '../../interfaces/SWApi';
import Spinner from '../Spinner/Spinner';
import NoResults from './NoResults/NoResults';
import Result from './Result/Result';

type Props = {
  isLoading: boolean;
  children: ReactNode;
};

export default function Results({ isLoading, children }: Props) {
  const limit = useAppSelector((state) => state.limit.limit);
  const persons = usePersons();

  if (isLoading) return <Spinner />;
  if (!persons.length) return <NoResults />;

  persons.length = limit;

  return (
    <section className={styles.wrapper}>
      {children}
      <h1 className={styles.title}>Search Results</h1>
      <div className={styles['results-wrapper']}>
        <ul className={styles.results}>
          {persons.map((person: Person) => {
            const { name, birth_year, url } = person;
            return (
              <Result
                key={url}
                name={name}
                birth_year={birth_year}
                url={url}
              ></Result>
            );
          })}
        </ul>
        <Outlet />
      </div>
    </section>
  );
}
