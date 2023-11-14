import { useState } from 'react';
import { useSelector } from 'react-redux';
import { INIT_PAGE } from '../../app/constants/constants';
import { RootState } from '../../app/store';
import { useFetchPersons } from '../../hooks';
import Pagination from '../Pagination/Pagination';
import Results from '../Results/Results';
import Search from '../Search/Search';

export default function Main() {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const limit = useSelector((state: RootState) => state.itemsPerPage.limit);

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
