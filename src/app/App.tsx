import './App.css';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import Main from '../components/Main/Main';

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Main />
      </Provider>
      <ErrorButton />
    </ErrorBoundary>
  );
}
