import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './Pagination.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setItemsPerPage } from '../../features';
import {
  INIT_PAGE,
  LIMIT_PER_PAGE,
  SEARCH_PARAM_PAGE,
} from '../../app/constants/constants';
import { useSearchParams } from 'react-router-dom';

type Props = {
  currentPage: number;
  total: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function Pagination({ currentPage, total, setPage }: Props) {
  const limit = useSelector((state: RootState) => state.itemsPerPage.limit);
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useSearchParams();

  const pagesCount = Math.ceil(total / LIMIT_PER_PAGE);
  const isPrevBtnDisabled = currentPage <= 1;
  const isNextBtnDisabled = currentPage >= pagesCount;

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    dispatch(setItemsPerPage(+value));

    setPage(INIT_PAGE);
    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
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
