import styles from './ResultDetails.module.css';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { viewDisplayed } from '../../../features/viewSlice';
import { useAppDispatch, useFetchPerson } from '../../../hooks';
import NotFound from '../../NotFound/NotFound';
import Spinner from '../../Spinner/Spinner';
import { useEffect } from 'react';

export default function ResultDetails() {
  const { id } = useParams() as { id: string };
  const [person, error, isLoading] = useFetchPerson(+id);

  const navigate = useNavigate();
  const { search } = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(viewDisplayed(true));
    return () => {
      dispatch(viewDisplayed(false));
    };
  }, [dispatch]);

  const handleClick = () => {
    navigate(`/${search}`);
  };

  if (isLoading) return <Spinner />;
  if (error) return <NotFound />;
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
