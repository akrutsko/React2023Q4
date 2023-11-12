import { Link } from 'react-router-dom';
import logo from '../../assets/images/star-wars.png';
import styles from './Search.module.css';

import { useRef } from 'react';
import { useSearch } from '../../hooks';

type Props = {
  onClick: (searchTerm: string) => void;
};

export default function Search({ onClick }: Props) {
  const searchTerm = useSearch();
  const textInput = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    const value = textInput.current?.value.trim() || '';
    onClick(value);
  };

  const handleLogoClick = () => {
    if (textInput.current) {
      textInput.current.value = '';
    }
    onClick('');
  };

  return (
    <section className={styles.wrapper}>
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="Star Wars"
            width={100}
            height={100}
            onClick={handleLogoClick}
          />
        </Link>
      </div>
      <div>
        <input ref={textInput} defaultValue={searchTerm} />
        <button onClick={handleSearchClick}>Search</button>
      </div>
    </section>
  );
}
