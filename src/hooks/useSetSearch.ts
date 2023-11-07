import { useContext } from 'react';
import { SearchSetStateContext } from '../contexts/SearchContext';

export function useSetSearch() {
  const setSearchQuery = useContext(SearchSetStateContext);

  if (!setSearchQuery) {
    throw new Error(
      'useSetSearch has to be used within <SearchSetStateContext.Provider>',
    );
  }
  return setSearchQuery;
}
