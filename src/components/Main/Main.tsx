import { useState } from 'react';
import { INIT_PAGE } from '../../app/constants/constants';
import { useAppSelector, useFetchPersons } from '../../hooks';
import Pagination from '../Pagination/Pagination';
import Results from '../Results/Results';
import Search from '../Search/Search';

export default function Main() {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const limit = useAppSelector((state) => state.limit.limit);

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
