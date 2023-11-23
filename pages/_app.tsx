import '@/styles/globals.css';

import { wrapper } from '@/src/store/store';
import type { AppProps } from 'next/app';
import RootLayout from './layout';

export function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default wrapper.withRedux(App);
