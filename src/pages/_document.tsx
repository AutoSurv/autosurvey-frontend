import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='whole-html' lang="en">
      <Head />
      <body className='whole-body'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
