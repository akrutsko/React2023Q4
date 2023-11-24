import styles from './Results.module.css';

import type { Data, Person } from '@/src/interfaces/SWApi';
import { getSearchParams } from '@/src/utils/search-params';
import { Router, useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';
import NoResults from './NoResults/NoResults';
import Result from './Result/Result';

type Props = {
  people: Data<Person>;
};

export default function Results({
  children,
  people,
}: PropsWithChildren<Props>) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handlerOn = () => setLoading(true);
    const handlerOff = () => setLoading(false);

    Router.events.on('routeChangeStart', handlerOn);
    Router.events.on('routeChangeComplete', handlerOff);
    Router.events.on('routeChangeError', handlerOff);

    return () => {
      Router.events.off('routeChangeStart', handlerOn);
      Router.events.off('routeChangeComplete', handlerOff);
      Router.events.off('routeChangeError', handlerOff);
    };
  }, []);

  const router = useRouter();
  const { limit } = getSearchParams(router.query);

  if (loading) return <Spinner />;
  if (!people) return <NoResults />;

  const persons = [...people.results];
  if (!persons.length) return <NoResults />;
  persons.length = limit;

  return (
    <section className={styles.wrapper}>
      <Pagination key={router.asPath} total={people.count} />
      <h1 className={styles.title}>Search Results</h1>
      <div className={styles['results-wrapper']}>
        <ul className={styles.results}>
          {persons.map((person) => {
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
        {children}
      </div>
    </section>
  );
}
