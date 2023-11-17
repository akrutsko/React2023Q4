import styles from './ResultDetails.module.css';

import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { Person } from '../../../interfaces/SWApi';
import { useGetPersonQuery } from '../../../services/api';
import NotFound from '../../NotFound/NotFound';
import Spinner from '../../Spinner/Spinner';

export default function ResultDetails() {
  const { id } = useParams() as { id: string };

  const { loadingDetails } = useActions();
  const { data, isFetching, isError } = useGetPersonQuery(id);

  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    loadingDetails(isFetching);
  }, [loadingDetails, isFetching]);

  const handleClick = () => {
    navigate(`/${search}`);
  };

  if (isFetching) return <Spinner />;
  if (isError) return <NotFound />;

  const { name, eye_color, gender, hair_color, height, skin_color } =
    data as Person;
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
