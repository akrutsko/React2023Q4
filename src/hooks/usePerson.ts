import { useEffect, useState } from 'react';
import { fetchPerson } from '../services/api';
import { Person } from '../interfaces/SWApi';

function usePerson(id: number) {
  const [data, setData] = useState<Person>();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetch = async (id: number) => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchPerson(id, { signal });
        setData(data);
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        if (error.name !== 'AbortError') {
          setError('Some error ocured while retrieving person details');
          setLoading(false);
        }
      }
    };

    fetch(id);

    return () => abortController.abort();
  }, [id]);

  return [data, error, isLoading] as const;
}

export default usePerson;
