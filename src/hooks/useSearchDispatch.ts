import { useContext } from 'react';
import { SearchDispatchContext } from '../contexts/SearchContext';

export function useSearchDispatch() {
  const setSearchQuery = useContext(SearchDispatchContext);

  if (!setSearchQuery) {
    throw new Error(
      'useSetSearch has to be used within <SearchSetStateContext.Provider>',
    );
  }
  return setSearchQuery;
}
