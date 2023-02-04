import { Html, Head, Main, NextScript } from 'next/document'
import Facebook from '../components/Facebook'

export default function Document() {
  return (
    <Html lang="en">
       <Head>
          <link rel="icon" href="/favicon.png" />
        </Head>
      <body>
        <Main />
        {/* <Facebook /> */}
        <NextScript />
      </body>
    </Html>
  )
}
