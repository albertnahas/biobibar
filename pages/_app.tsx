import "../styles/globals.css"
import "../styles/loader.css"
import type { AppProps } from "next/app"
import { ProductProvider } from "../contexts/ProductsContext"
import AOS from "aos"
import "aos/dist/aos.css"
import { SEO } from "../components/SEO"
import { useEffect, useState } from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import NProgress from "nprogress"
import Router, { useRouter } from "next/router"
import { SplashScreen } from "../components/SplashScreen"

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

  // loading state
  const route = useRouter()
  const [loading, setLoading] = useState(route.pathname === "/")

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto"
    // scroll to top
    loading && window.scrollTo(0, 0)
    // check if body has loaded class
    loading && setTimeout(() => {
      setLoading(false)
      document.body.style.overflow = "auto"
    }, 3500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <>
      <ProductProvider>
        <SEO />
        <ToastContainer />
        {loading && <SplashScreen />}
        <Component {...pageProps} />
      </ProductProvider>
    </>
  )
}
