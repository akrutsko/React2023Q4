import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetchPersons } from '../../hooks/useFetchPersons';
import { useSearch } from '../../hooks/useSearch';
import { useSearchDispatch } from '../../hooks/useSearchDispatch';
import Pagination from '../Pagination/Pagination';
import Results from '../Results/Results';
import Search from '../Search/Search';

const INIT_PAGE = 1;
const INIT_LIMIT = 10;
const SEARCH_PARAM_PAGE = 'page';

export default function Main() {
  const searchTerm = useSearch();
  const setSearchTerm = useSearchDispatch();
  const [currentPage, setCurrentPage] = useState(INIT_PAGE);
  const [limit, setLimit] = useState(INIT_LIMIT);
  const [isLoading, totalResults] = useFetchPersons(
    searchTerm,
    currentPage,
    limit,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchClick = (search: string) => {
    setSearchTerm(search);
    initFirstPage();
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
    initFirstPage();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ [SEARCH_PARAM_PAGE]: page.toString() });
  };

  const initFirstPage = () => {
    setCurrentPage(INIT_PAGE);
    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
  };

  return (
    <main>
      <Search onClick={handleSearchClick} searchTerm={searchTerm} />
      <Results isLoading={isLoading} limit={limit}>
        <Pagination
          currentPage={currentPage}
          total={totalResults}
          limit={limit}
          onPageChange={handlePageChange}
          onLimitChage={handleLimitChange}
        />
      </Results>
    </main>
  );
}
