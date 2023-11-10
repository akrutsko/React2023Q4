import styles from './Results.module.css';

import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Person } from '../../interfaces/SWApi';
import { LinkWithQuery } from '../LinkWithQuery/LinkWithQuery';
import Spinner from '../Spinner/Spinner';
import NoResults from './NoResults/NoResults';
import { usePersons } from '../../hooks';

type Props = {
  isLoading: boolean;
  children: ReactNode;
  limit: number;
};

export default function Results({ isLoading, limit, children }: Props) {
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
            const id = url.split('/').filter(Boolean).at(-1);

            return (
              <li key={id}>
                <LinkWithQuery to={id || ''}>
                  <p>
                    <i>Name:</i> {name}
                  </p>
                  <p>
                    <i>Birth year:</i> {birth_year}
                  </p>
                </LinkWithQuery>
              </li>
            );
          })}
        </ul>
        <Outlet />
      </div>
    </section>
  );
}
