import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePersons } from '../../hooks/usePersons';
import Pagination from '../Pagination/Pagination';
import Result from '../Results/Results';
import Search from '../Search/Search';

const INIT_PAGE = 1;
const INIT_LIMIT = 10;
const SEARCH_PARAM_PAGE = 'page';

export default function Main() {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('ak-react-search-term') || '',
  );
  const [currentPage, setCurrentPage] = useState(INIT_PAGE);
  const [limit, setLimit] = useState(INIT_LIMIT);
  const [data, isLoading, totalResults] = usePersons(
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
      <Result isLoading={isLoading} data={data} limit={limit}>
        <Pagination
          currentPage={currentPage}
          total={totalResults}
          limit={limit}
          onPageChange={handlePageChange}
          onLimitChage={handleLimitChange}
        />
      </Result>
    </main>
  );
}
