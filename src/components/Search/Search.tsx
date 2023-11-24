import { LIMIT_PER_PAGE } from '@/src/constants/constants';
import styles from './Search.module.css';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { encode } from 'querystring';
import { useEffect, useRef } from 'react';
import { getSearchTerm, setSearchTerm } from '@/src/services/local-storage';

export default function Search() {
  const textInput = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const searchParams = new URLSearchParams(encode(router.query));
  const search = Number(searchParams.get('search')) || '';
  const limit = Number(searchParams.get('limit')) || LIMIT_PER_PAGE;

  useEffect(() => {
    const searchTerm = getSearchTerm();
    if (!search && searchTerm && textInput.current) {
      textInput.current.value = searchTerm;
    }
  }, [search]);

  const handleSearchClick = () => {
    const search = textInput.current?.value.trim() || '';
    setSearchTerm(search);

    router.push({
      pathname: '/',
      query: { search, limit },
    });
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
        <Link href="/">
          <Image
            src="/assets/images/star-wars.png"
            alt="Star Wars"
            width={100}
            height={100}
            quality={100}
            priority
            onClick={handleLogoClick}
          />
        </Link>
      </div>
      <div>
        <input ref={textInput} defaultValue={search} />
        <button onClick={handleSearchClick}>Search</button>
      </div>
    </section>
  );
}
