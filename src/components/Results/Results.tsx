import styles from './Results.module.css';

import { Outlet } from 'react-router-dom';
import { Person } from '../../interfaces/SWApi';
import NoResults from './NoResults/NoResults';
import { LinkWithQuery } from '../Router/LinkWithQuery/LinkWithQuery';
import Spinner from '../Spinner/Spinner';

type Props = {
  isLoading: boolean;
  data: Person[];
  children: React.ReactNode;
};

export default function Result({ isLoading, data, children }: Props) {
  if (isLoading) return <Spinner />;
  if (!data.length) return <NoResults />;

  return (
    <section className={styles.wrapper}>
      {children}
      <h1 className={styles.title}>Search Results</h1>
      <div className={styles['results-wrapper']}>
        <ul className={styles.results}>
          {data.map((person: Person) => {
            const { name, birth_year, gender, url } = person;
            const id = url.split('/').filter(Boolean).at(-1);

            return (
              <li key={id}>
                <LinkWithQuery to={id || '/'}>
                  <p>
                    <i>Name:</i> {name}
                  </p>
                  <p>
                    <i>Description:</i> {gender} {birth_year}
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
