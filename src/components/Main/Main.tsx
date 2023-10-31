import Search from '../Search/Search';
import Result from '../Result/Result';
import ErrorButton from '../ErrorButton/ErrorButton';
import { Person } from '../../interfaces/SWApi';
import { fetchPeople } from '../../services/api';
import { useEffect, useState } from 'react';

function Main() {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('ak-react-search-term') || '',
  );
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Person[]>([]);

  useEffect(() => {
    handleClick(searchTerm);
  }, [searchTerm]);

  const handleClick = async (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setLoading(true);
    localStorage.setItem('ak-react-search-term', searchTerm);

    try {
      const data = await fetchPeople(searchTerm);
      setData(data.results);
    } catch (err) {
      console.error('API Error:', (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Search onClick={handleClick} searchTerm={searchTerm} />
      <Result isLoading={isLoading} data={data} />
      <ErrorButton />
    </main>
  );
}

export default Main;
