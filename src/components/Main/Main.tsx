import { useState } from 'react';
import { INIT_PAGE } from '../../app/constants/constants';
import { selectLimit } from '../../features/limitSlice';
import { selectSearch } from '../../features/searchSlice';
import { useAppSelector, useFetchPersons } from '../../hooks';
import Pagination from '../Pagination/Pagination';
import Results from '../Results/Results';
import Search from '../Search/Search';

export default function Main() {
  const searchTerm = useAppSelector(selectSearch);
  const limit = useAppSelector(selectLimit);

  const [currentPage, setCurrentPage] = useState(INIT_PAGE);
  const [isLoading, totalResults] = useFetchPersons(
    searchTerm,
    currentPage,
    limit,
  );

  return (
    <main>
      <Search setPage={setCurrentPage} />
      <Results isLoading={isLoading}>
        <Pagination
          currentPage={currentPage}
          total={totalResults}
          setPage={setCurrentPage}
        />
      </Results>
    </main>
  );
}
