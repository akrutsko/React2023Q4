import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

export const SearchContext = createContext('');
export const SearchSetStateContext = createContext<Dispatch<
  SetStateAction<string>
> | null>(null);

const searchTerm = localStorage.getItem('ak-react-search-term');

type Props = {
  children: ReactNode;
};

export default function SearchProvider({ children }: Props) {
  const [searchQuery, setSearchQuery] = useState(searchTerm || '');

  return (
    <SearchContext.Provider value={searchQuery}>
      <SearchSetStateContext.Provider value={setSearchQuery}>
        {children}
      </SearchSetStateContext.Provider>
    </SearchContext.Provider>
  );
}
