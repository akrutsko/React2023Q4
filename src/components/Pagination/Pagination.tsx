import styles from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  total: number;
  onPageChange(page: number): void;
};

const LIMIT = 10;

function Pagination({ currentPage, total, onPageChange }: PaginationProps) {
  const pagesCount = Math.ceil(total / LIMIT);

  const isPrevBtnDisabled = currentPage <= 1;
  const isNextBtnDisabled = currentPage >= pagesCount;

  return (
    <div className={styles.wrapper}>
      <button
        disabled={isPrevBtnDisabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </button>
      <span>{currentPage}</span>
      <button
        disabled={isNextBtnDisabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </button>
    </div>
  );
}

export default Pagination;
