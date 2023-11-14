import { Link } from 'react-router-dom';
import logo from '../../assets/images/star-wars.png';
import styles from './Search.module.css';

import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

type Props = {
  onSearch: (searchTerm: string) => void;
};

export default function Search({ onSearch }: Props) {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const textInput = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    const value = textInput.current?.value.trim() || '';
    onSearch(value);
  };

  const handleLogoClick = () => {
    if (textInput.current) {
      textInput.current.value = '';
    }
    onSearch('');
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
