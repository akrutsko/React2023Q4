import styles from './ResultDetails.module.css';

import type { Person } from '@/src/interfaces/SWApi';
import NotFound from '../../NotFound/NotFound';

type Props = {
  data: Person;
};

export default function ResultDetails({ data }: Props) {
  const handleClick = () => {
    // navigate(`/${search}`);
  };

  if (!data) return <NotFound />;

  const { name, eye_color, gender, hair_color, height, skin_color } = data;
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
