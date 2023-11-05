import './App.css';

import Main from '../Main/Main';
import ErrorButton from '../ErrorButton/ErrorButton';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Main />
      <ErrorButton />
    </ErrorBoundary>
  );
}
