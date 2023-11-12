export const SEARCH_TERM_KEY = 'ak-react-search-term';

export function getSearchTerm() {
  return localStorage.getItem(SEARCH_TERM_KEY) || '';
}

export function setSearchTerm(search: string) {
  return localStorage.setItem(SEARCH_TERM_KEY, search);
}
