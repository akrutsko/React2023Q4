import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { getSearchTerm } from '../services/local-storage';

export const SearchContext = createContext('');
export const SearchDispatchContext = createContext<Dispatch<
  SetStateAction<string>
> | null>(null);

type Props = {
  children: ReactNode;
};

export default function SearchProvider({ children }: Props) {
  const [searchQuery, setSearchQuery] = useState(getSearchTerm);

  return (
    <SearchContext.Provider value={searchQuery}>
      <SearchDispatchContext.Provider value={setSearchQuery}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}
