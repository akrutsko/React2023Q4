import '../styles/globals.css';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import ErrorButton from '@/components/ErrorButton/ErrorButton';
import StoreProvider from '@/store/StoreProvider/StoreProvider';
import type { AppProps } from 'next/app';
import RootLayout from './_layout';

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
