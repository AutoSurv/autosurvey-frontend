import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='whole-html' lang="en">
      <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico"></link>
          <meta name="theme-color" content="#fff" />
        </Head>
      <body className='whole-body'>
        <Main />
        <NextScript /> 
      </body>
    </Html>
  )
}
