import { useEffect, useRef, useState } from 'react';
import { fetchPeople } from '../services/api';
import { usePersonsDispatch } from './usePersonsDispatch';

export function useFetchPersons(
  searchTerm: string,
  currentPage: number,
  limit: number,
) {
  const setPersons = usePersonsDispatch();
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
        setPersons(results);
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
  }, [searchTerm, currentPage, limit, setPersons]);

  return [isLoading, totalResults.current] as const;
}
