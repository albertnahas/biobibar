import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ProductProvider } from "../contexts/ProductsContext"
import AOS from "aos"
import "aos/dist/aos.css"
import { SEO } from "../components/SEO"
import { useEffect } from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from "react-toastify"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <ProductProvider>
      <SEO />
      <ToastContainer />
      <Component {...pageProps} />
    </ProductProvider>
  )
}
