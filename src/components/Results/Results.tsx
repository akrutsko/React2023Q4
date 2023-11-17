import styles from './Results.module.css';

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { selectLimit } from '../../features/limitSlice';
import { selectPage } from '../../features/pageSlice';
import { selectSearch } from '../../features/searchSlice';
import { useActions, useAppSelector } from '../../hooks';
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

  useEffect(() => {
    loadingMain(isFetching);
  }, [loadingMain, isFetching]);

  if (isFetching) return <Spinner />;
  if (isError || !data) return <NoResults />;

  const persons = [...data.results];
  if (!persons.length) return <NoResults />;
  persons.length = limit;

  return (
    <section className={styles.wrapper}>
      <Pagination total={data.count} />
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
        <Outlet />
      </div>
    </section>
  );
}
