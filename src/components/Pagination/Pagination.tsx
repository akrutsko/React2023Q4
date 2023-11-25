import styles from './Pagination.module.css';

import { getSearchParams } from '@/utils/search-params';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';
import { LIMIT_PER_PAGE } from '../../constants/constants';

type Props = {
  total: number;
};

export default function Pagination({ total }: Props) {
  const router = useRouter();
  const { search, limit, page } = getSearchParams(router.query);

  const pagesCount = Math.ceil(total / LIMIT_PER_PAGE);
  const isPrevBtnDisabled = page <= 1;
  const isNextBtnDisabled = page >= pagesCount;

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    router.push({
      pathname: '/',
      query: { search, page, limit: value },
    });
  };

  const handlePageChange = (pageNumber: number) => {
    router.push({
      pathname: '/',
      query: { search, page: pageNumber, limit },
    });
  };

  return (
    <div className={styles.wrapper}>
      <select defaultValue={limit} onChange={handleLimitChange}>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <button
        disabled={isPrevBtnDisabled}
        onClick={() => handlePageChange(page - 1)}
      >
        ←
      </button>
      <span>{page}</span>
      <button
        disabled={isNextBtnDisabled}
        onClick={() => handlePageChange(page + 1)}
      >
        →
      </button>
    </div>
  );
}
