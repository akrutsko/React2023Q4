import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import styles from './ResultDetails.module.css';
import { useFetchPerson } from '../../../hooks';

export default function ResultDetails() {
  const { id } = useParams() as { id: string };
  const [person, error, isLoading] = useFetchPerson(+id);

  const navigate = useNavigate();
  const { search } = useLocation();

  const handleClick = () => {
    navigate(`/${search}`);
  };

  if (isLoading) return <Spinner />;
  if (error) {
    throw error;
  }
  if (!person) return null;

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
