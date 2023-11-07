import { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';

export function useSearch() {
  const search = useContext(SearchContext);

  if (search == null) {
    throw new Error('useSearch has to be used within <SearchContext.Provider>');
  }
  return search;
}
