/* eslint-disable @next/next/no-sync-scripts */
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='shortcut icon' href='/favicon.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          type='text/javascript'
          src='https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js'
          data-name='bmc-button'
          data-slug='rsrm.dev'
          data-color='#FFDD00'
          data-emoji=''
          data-font='Cookie'
          data-text='Buy me a coffee'
          data-outline-color='#000000'
          data-font-color='#000000'
          data-coffee-color='#ffffff'
        />
      </body>
    </Html>
  );
}
