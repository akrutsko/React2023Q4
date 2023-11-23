import styles from './Results.module.css';

import { encode } from 'querystring';

import { LIMIT_PER_PAGE } from '@/src/constants/constants';
import type { Data, Person } from '@/src/interfaces/SWApi';
import { useRouter } from 'next/router';
import Pagination from '../Pagination/Pagination';
import NoResults from './NoResults/NoResults';
import Result from './Result/Result';

type Props = {
  data: Data<Person>;
};

export default function Results({ data }: Props) {
  const router = useRouter();
  const searchParams = new URLSearchParams(encode(router.query));

  if (!data) return <NoResults />;

  const persons = [...data.results];
  if (!persons.length) return <NoResults />;
  persons.length = Number(searchParams.get('limit')) || LIMIT_PER_PAGE;

  return (
    <section className={styles.wrapper}>
      <Pagination key={router.asPath} total={data.count} />
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
      </div>
    </section>
  );
}
