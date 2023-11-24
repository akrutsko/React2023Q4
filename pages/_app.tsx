import '@/styles/globals.css';

import ErrorBoundary from '@/src/components/ErrorBoundary/ErrorBoundary';
import ErrorButton from '@/src/components/ErrorButton/ErrorButton';
import StoreProvider from '@/src/components/StoreProvider/StoreProvider';
import type { AppProps } from 'next/app';
import RootLayout from './layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <RootLayout>
        <ErrorBoundary>
          <Component {...pageProps} />
          <ErrorButton />
        </ErrorBoundary>
      </RootLayout>
    </StoreProvider>
  );
}

export default App;
