import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { setSearch } from '../../features';
import { useFetchPersons } from '../../hooks';
import Pagination from '../Pagination/Pagination';
import Results from '../Results/Results';
import Search from '../Search/Search';
import { INIT_PAGE, SEARCH_PARAM_PAGE } from '../../app/constants/constants';

export default function Main() {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const limit = useSelector((state: RootState) => state.itemsPerPage.limit);
  const dispatch = useDispatch<AppDispatch>();

  const [currentPage, setCurrentPage] = useState(INIT_PAGE);
  const [isLoading, totalResults] = useFetchPersons(
    searchTerm,
    currentPage,
    limit,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (search: string) => {
    dispatch(setSearch(search));
    setCurrentPage(INIT_PAGE);
    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
  };

  return (
    <main>
      <Search onSearch={handleSearch} />
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
