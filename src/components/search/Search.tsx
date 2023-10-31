import styles from './Search.module.css';
import logo from '../../assets/images/star-wars.png';

import { useRef } from 'react';

type SearchProps = {
  onClick: (searchTerm: string) => void;
  searchTerm: string;
};

function Search({ onClick, searchTerm }: SearchProps) {
  const textInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const value = textInput.current?.value || '';
    onClick(value.trim());
  };

  return (
    <section className={styles.wrapper}>
      <div>
        <img src={logo} alt="Star Wars" width={100} height={100} />
      </div>
      <div>
        <input ref={textInput} defaultValue={searchTerm} />
        <button onClick={handleClick}>Search</button>
      </div>
    </section>
  );
}

export default Search;
