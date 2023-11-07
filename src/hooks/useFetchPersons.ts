import { useEffect, useRef, useState } from 'react';
import { Person } from '../interfaces/SWApi';
import { fetchPeople } from '../services/api';

export function useFetchPersons(
  searchTerm: string,
  currentPage: number,
  limit: number,
) {
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
        const { results, count } = await fetchPeople(search, page, limit, {
          signal,
        });
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
  }, [searchTerm, currentPage, limit]);

  return [data, isLoading, totalResults.current] as const;
}
