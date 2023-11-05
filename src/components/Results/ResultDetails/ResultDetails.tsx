import { useOutletContext, useParams } from 'react-router-dom';
import usePerson from '../../../hooks/usePerson';
import { LinkWithQuery } from '../../Router/LinkWithQuery/LinkWithQuery';
import Spinner from '../../Spinner/Spinner';
import styles from './ResultDetails.module.css';

export default function ResultDetails() {
  const searchParams = useOutletContext();
  console.log('searchParams', searchParams);

  const { id } = useParams() as { id: string };
  const [person, error, isLoading] = usePerson(+id);

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
      <LinkWithQuery to="/">
        <button>Close</button>
      </LinkWithQuery>
      <LinkWithQuery to="/">
        <button className={styles.overlay}></button>
      </LinkWithQuery>
    </div>
  );
}
