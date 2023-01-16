import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ProductProvider } from "../contexts/ProductsContext"
import AOS from "aos"
import "aos/dist/aos.css"
import { SEO } from "../components/SEO"
import { useEffect } from "react"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <ProductProvider>
      <SEO />
      <Component {...pageProps} />
    </ProductProvider>
  )
}
