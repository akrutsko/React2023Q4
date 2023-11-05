import styles from './Pagination.module.css';

type Props = {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChage: (limit: number) => void;
};

const LIMIT = 10;

export default function Pagination({
  currentPage,
  total,
  limit,
  onPageChange,
  onLimitChage,
}: Props) {
  const pagesCount = Math.ceil(total / LIMIT);

  const isPrevBtnDisabled = currentPage <= 1;
  const isNextBtnDisabled = currentPage >= pagesCount;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChage(+e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <select value={limit} onChange={handleChange}>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
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
