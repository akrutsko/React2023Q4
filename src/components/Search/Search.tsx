import styles from './Search.module.css';

import { getSearchParams } from '@/utils/search-params';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function Search() {
  const textInput = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { search, limit, page } = getSearchParams(router.query);

  const handleSearchClick = () => {
    const search = textInput.current?.value.trim() || '';
    router.push({
      pathname: '/',
      query: { search, limit, page },
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
