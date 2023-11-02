import './App.css';

import Main from '../Main/Main';
import ErrorButton from '../ErrorButton/ErrorButton';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Main />
      <ErrorButton />
    </ErrorBoundary>
  );
}

export default App;
