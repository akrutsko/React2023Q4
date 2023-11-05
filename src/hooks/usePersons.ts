import { useEffect, useRef, useState } from 'react';
import { fetchPeople } from '../services/api';
import { Person } from '../interfaces/SWApi';

function usePersons(searchTerm: string, currentPage: number) {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);

  const totalResults = useRef(0);

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
        setLoading(false);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setLoading(false);
        }
      }
    };

    fetch(searchTerm, currentPage);

    return () => abortController.abort();
  }, [searchTerm, currentPage]);

  return [data, isLoading, totalResults.current] as const;
}

export default usePersons;
