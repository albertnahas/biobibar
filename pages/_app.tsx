import "../styles/globals.css"
import "../styles/loader.css"
import type { AppProps } from "next/app"
import { ProductProvider } from "../contexts/ProductsContext"
import AOS from "aos"
import "aos/dist/aos.css"
import { SEO } from "../components/SEO"
import { useEffect } from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import NProgress from "nprogress"
import Router from "next/router"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init()
  }, [])

  Router.events.on("routeChangeStart", (url) => {
    NProgress.start()
  })
  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done()
  })
  Router.events.on("routeChangeError", (url) => {
    NProgress.done()
  })

  return (
    <>
      <ProductProvider>
        <SEO />
        <ToastContainer />
        <Component {...pageProps} />
      </ProductProvider>
    </>
  )
}
