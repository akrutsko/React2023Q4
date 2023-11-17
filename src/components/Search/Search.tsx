import logo from '../../assets/images/star-wars.png';
import styles from './Search.module.css';

import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { INIT_PAGE, SEARCH_PARAM_PAGE } from '../../constants/constants';
import { selectSearch } from '../../features/searchSlice';
import { useAppSelector } from '../../hooks';
import { useActions } from '../../hooks/useActions';
import { setSearchTerm } from '../../services/local-storage';

export default function Search() {
  const textInput = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = useAppSelector(selectSearch);
  const { searchChanged, pageUpdated } = useActions();

  const handleSearchClick = () => {
    const value = textInput.current?.value.trim() || '';
    setSearchTerm(value);

    searchChanged(value);
    pageUpdated(INIT_PAGE);

    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
  };

  const handleLogoClick = () => {
    if (textInput.current) {
      textInput.current.value = '';
    }
    handleSearchClick();
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
