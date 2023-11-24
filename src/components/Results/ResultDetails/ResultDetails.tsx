import styles from './ResultDetails.module.css';

import { INIT_PAGE, LIMIT_PER_PAGE } from '@/src/constants/constants';
import type { Person } from '@/src/interfaces/SWApi';
import { useRouter } from 'next/router';
import { encode } from 'querystring';
import NotFound from '../../NotFound/NotFound';

type Props = {
  person: Person;
};

export default function ResultDetails({ person }: Props) {
  const router = useRouter();
  const searchParams = new URLSearchParams(encode(router.query));
  const limit = Number(searchParams.get('limit')) || LIMIT_PER_PAGE;
  const page = Number(searchParams.get('page')) || INIT_PAGE;
  const search = Number(searchParams.get('search')) || '';

  const handleClick = () => {
    router.push({
      pathname: '/',
      query: { search, page, limit },
    });
  };

  if (!person) return <NotFound />;

  const { name, eye_color, gender, hair_color, height, skin_color } = person;
  return (
    <div className={styles.wrapper}>
      <ul>
        <li>Name: {name}</li>
        <li>Gender: {gender}</li>
        <li>Height: {height}</li>
        <li>Skin color: {skin_color}</li>
        <li>Hair color: {hair_color}</li>
        <li>Eye color: {eye_color}</li>
      </ul>
      <div className={styles['wrapper-button']}>
        <button onClick={handleClick}>Close</button>
      </div>
      <button className={styles.overlay} onClick={handleClick}></button>
    </div>
  );
}
