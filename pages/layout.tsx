import Head from 'next/head';
import { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>React2023Q4. Next.js</title>
        <meta name="description" content="React. Next.JS/SSR/SSG" />
        <link rel="icon" type="image/png" href="/assets/ico/star-wars-32.png" />
      </Head>
      {children}
    </>
  );
}
