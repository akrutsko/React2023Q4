import './App.css';

import { Provider } from 'react-redux';
import { store } from './app/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorButton from './components/ErrorButton/ErrorButton';
import Main from './components/Main/Main';

export default function App() {
  // TODO remove logs and comments
  console.log('initialState ', store.getState());
  // store.subscribe(() => {
  //   console.log('updated state ', store.getState());
  // });

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Main />
      </Provider>
      <ErrorButton />
    </ErrorBoundary>
  );
}
