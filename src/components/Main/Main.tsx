import Search from '../Search/Search';
import Result from '../Result/Result';
import { Person } from '../../interfaces/SWApi';
import { fetchPeople } from '../../services/api';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../Pagination/Pagination';

const INIT_PAGE = 1;
const INIT_RESULTS = 0;

function Main() {
  const totalResults = useRef(INIT_RESULTS);

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('ak-react-search-term') || '',
  );
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(INIT_PAGE);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetch = async (search: string, page: number) => {
      setLoading(true);
      localStorage.setItem('ak-react-search-term', searchTerm);
      try {
        const { results, count } = await fetchPeople(search, page, { signal });
        setData(results);
        totalResults.current = count;
      } catch (err) {
        console.error('API Error:', (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetch(searchTerm, currentPage);

    return () => abortController.abort();
  }, [searchTerm, currentPage]);

  const handleClick = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(INIT_PAGE);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <Search onClick={handleClick} searchTerm={searchTerm} />
      <Result isLoading={isLoading} data={data}>
        <Pagination
          currentPage={currentPage}
          total={totalResults.current}
          onPageChange={handlePageChange}
        />
      </Result>
    </main>
  );
}

export default Main;
