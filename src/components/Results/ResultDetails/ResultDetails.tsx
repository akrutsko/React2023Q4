import styles from './ResultDetails.module.css';

import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetPersonQuery } from '../../../features/api/peopleApi';
import { useActions } from '../../../hooks';
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
  if (isError || !data) return <NotFound />;

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
