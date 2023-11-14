import './App.css';

import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import Main from '../components/Main/Main';
import PersonsProvider from '../contexts/PersonsContext';
import { store } from './store';

export default function App() {
  console.log('initialState ', store.getState());
  store.subscribe(() => {
    console.log('updated state ', store.getState());
  });

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersonsProvider>
          <Main />
        </PersonsProvider>
        <ErrorButton />
      </Provider>
    </ErrorBoundary>
  );
}
