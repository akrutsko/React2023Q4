import { useContext } from 'react';
import { SearchDispatchContext } from '../contexts/SearchContext';

export function useSearchDispatch() {
  const setSearchQuery = useContext(SearchDispatchContext);

  if (!setSearchQuery) {
    throw new Error(
      'useSearchDispatch has to be used within <SearchSetStateContext.Provider>',
    );
  }
  return setSearchQuery;
}
