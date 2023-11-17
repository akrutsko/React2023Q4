import styles from './Results.module.css';

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { selectLimit } from '../../features/limitSlice';
import { selectPage } from '../../features/pageSlice';
import { selectSearch } from '../../features/searchSlice';
import { useAppSelector } from '../../hooks';
import { useActions } from '../../hooks/useActions';
import { Data, Person } from '../../interfaces/SWApi';
import { useGetPeopleQuery } from '../../services/api';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';
import NoResults from './NoResults/NoResults';
import Result from './Result/Result';

export default function Results() {
  const { loadingMain } = useActions();
  const searchTerm = useAppSelector(selectSearch);
  const limit = useAppSelector(selectLimit);
  const currentPage = useAppSelector(selectPage);

  const searchParams = new URLSearchParams();
  searchTerm && searchParams.append('search', searchTerm);
  limit && searchParams.append('limit', limit.toString());
  currentPage && searchParams.append('page', currentPage.toString());

  const { isFetching, data, isError } = useGetPeopleQuery(
    searchParams.toString(),
  );
  const res = data as Data<Person>;

  useEffect(() => {
    loadingMain(isFetching);
  }, [loadingMain, isFetching]);

  if (isFetching) return <Spinner />;
  if (isError) return <NoResults />;

  const persons = [...res.results];
  if (!persons.length) return <NoResults />;
  persons.length = limit;

  return (
    <section className={styles.wrapper}>
      <Pagination total={res.count} />
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
