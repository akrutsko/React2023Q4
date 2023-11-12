import './App.css';

import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import Main from '../components/Main/Main';
import SearchProvider from '../contexts/SearchContext';
import PersonsProvider from '../contexts/PersonsContext';

export default function App() {
  return (
    <ErrorBoundary>
      <SearchProvider>
        <PersonsProvider>
          <Main />
        </PersonsProvider>
      </SearchProvider>
      <ErrorButton />
    </ErrorBoundary>
  );
}
