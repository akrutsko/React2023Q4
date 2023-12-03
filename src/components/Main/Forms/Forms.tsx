import styles from './Forms.module.css';

import { TIME_TO_SHOW } from '../../../assets/constants';
import { useAppSelector } from '../../../hooks/hooks';
import { selectForms } from '../../../store/slices/formsSlice';

export default function Forms() {
  const forms = useAppSelector(selectForms);

  return (
    <ul>
      {[...forms].reverse().map((form) => {
        const isNew = Date.now() - form.createdAt < TIME_TO_SHOW;

        return (
          <li key={form.createdAt} className={isNew ? styles.new : ''}>
            <p>Name: {form.name}</p>
            <p>Age: {form.age}</p>
            <p>Gender: {form.gender}</p>
            <p>Country: {form.country}</p>
            <p>Email: {form.email}</p>
            <p>Password: {form.password}</p>
            <p>Consent: {form.consent ? 'true' : 'false'}</p>
            <div>
              <img src={form.image.base64} alt="photo" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
