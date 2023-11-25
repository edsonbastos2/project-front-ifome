import Head from 'next/head'
import { Provider as AppContextProvider } from '../contexts/app'
import { Provider as AuthContextProvider } from '../contexts/auth'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <AuthContextProvider>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default MyApp
