import styles from './ResultDetails.module.css';

import type { Person } from '@/interfaces/SWApi';
import { useRouter } from 'next/router';
import NoDetails from '../NoDetails/NoDetails';

type Props = {
  person: Person;
};

export default function ResultDetails({ person }: Props) {
  const router = useRouter();

  const navigateBack = () => router.back();

  if (!person) return <NoDetails />;

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
        <button onClick={navigateBack}>Close</button>
      </div>
      <button className={styles.overlay} onClick={navigateBack}></button>
    </div>
  );
}
