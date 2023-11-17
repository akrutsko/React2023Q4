import styles from './Pagination.module.css';

import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  INIT_PAGE,
  LIMIT_PER_PAGE,
  SEARCH_PARAM_PAGE,
} from '../../constants/constants';
import { limitChanged, selectLimit } from '../../features/limitSlice';
import { pageUpdated, selectPage } from '../../features/pageSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

type Props = {
  total: number;
};

export default function Pagination({ total }: Props) {
  const limit = useAppSelector(selectLimit);
  const currentPage = useAppSelector(selectPage);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const pagesCount = Math.ceil(total / LIMIT_PER_PAGE);
  const isPrevBtnDisabled = currentPage <= 1;
  const isNextBtnDisabled = currentPage >= pagesCount;

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    dispatch(limitChanged(+value));
    dispatch(pageUpdated(INIT_PAGE));

    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(pageUpdated(pageNumber));
    setSearchParams({ [SEARCH_PARAM_PAGE]: String(pageNumber) });
  };

  return (
    <div className={styles.wrapper}>
      <select value={limit} onChange={handleLimitChange}>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <button
        disabled={isPrevBtnDisabled}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        ←
      </button>
      <span>{currentPage}</span>
      <button
        disabled={isNextBtnDisabled}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        →
      </button>
    </div>
  );
}
