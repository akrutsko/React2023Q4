import styles from './Results.module.css';

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { selectLimit } from '../../features/limitSlice';
import { loadingMain } from '../../features/loadingSlice';
import { selectPage } from '../../features/pageSlice';
import { selectSearch } from '../../features/searchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Person } from '../../interfaces/SWApi';
import { useGetPeopleQuery } from '../../services/api';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';
import NoResults from './NoResults/NoResults';
import Result from './Result/Result';

const initialData = {
  count: 0,
  next: '',
  previous: '',
  results: [],
};

export default function Results() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearch);
  const limit = useAppSelector(selectLimit);
  const currentPage = useAppSelector(selectPage);

  const searchParams = new URLSearchParams();
  searchTerm && searchParams.append('search', searchTerm);
  limit && searchParams.append('limit', limit.toString());
  currentPage && searchParams.append('page', currentPage.toString());

  const { isFetching, data = initialData } = useGetPeopleQuery(
    searchParams.toString() || '',
  );
  const persons = [...data.results] as Person[];

  useEffect(() => {
    dispatch(loadingMain(isFetching));
  }, [dispatch, isFetching]);

  if (isFetching) return <Spinner />;
  if (!persons.length) return <NoResults />;
  persons.length = limit;

  return (
    <section className={styles.wrapper}>
      <Pagination total={82} />
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
