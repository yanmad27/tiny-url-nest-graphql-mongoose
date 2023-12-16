import { Inter } from 'next/font/google';
import Head from 'next/head';
import ShortenUrl from 'src/components/shorten-url/ShortenUrl';
import styles from 'src/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>rsrm.dev - Shorten Url</title>
        <meta name='description' content='Shorten URL' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <ShortenUrl />
      </main>
    </>
  );
}
