import { Link, useSearchParams } from 'react-router-dom';
import logo from '../../assets/images/star-wars.png';
import styles from './Search.module.css';

import { Dispatch, SetStateAction, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { INIT_PAGE, SEARCH_PARAM_PAGE } from '../../app/constants/constants';
import { setSearch } from '../../features';

type Props = {
  setPage: Dispatch<SetStateAction<number>>;
};

export default function Search({ setPage }: Props) {
  const textInput = useRef<HTMLInputElement>(null);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchClick = () => {
    const value = textInput.current?.value.trim() || '';
    dispatch(setSearch(value));
    setPage(INIT_PAGE);
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
