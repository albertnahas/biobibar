import Head from "next/head"
import Image from "next/image"
import { Footer } from "../components/Footer"
import fetchAbout from "../helpers/about/fetchAbout"
import fetchInfo from "../helpers/info/fetchInfo"
import Breadcrumb from "../molecules/Breadcrumb"
import { About } from "../types/about"
import { Info } from "../types/info"
import Layout from "./layout"
import ReactHtmlParser from "react-html-parser"
import { AboutBanner } from "../components/HomeSections/AboutBanner"
import { Animate } from "../components/Animate"
import { ContactSection } from "../components/HomeSections/ContactSection"
import { FeaturedSection } from "../components/HomeSections/FeaturedSection"
import fetchProducts from "../helpers/products/fetchProducts"
import { Product } from "../types/product"
import fetchHome from "../helpers/home/fetchHome"
import { Home } from "../types/home"

export async function getStaticProps() {
  const home = (await fetchHome()) || {}
  const info = (await fetchInfo()) || {}
  const about = (await fetchAbout()) || {}
  const featuredProducts = await fetchProducts({ featured: true })
  return {
    props: {
      home,
      info,
      about,
      featuredProducts,
    },
    revalidate: 10,
  }
}

const about = ({
  home,
  info,
  about,
  featuredProducts,
}: {
  home?: Home
  info?: Info
  about?: About
  featuredProducts?: Product[]
}) => {
  return (
    <>
      <Head>
        <title>About - BIOBIBAR</title>
        <meta name="description" content="About us." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.biobibar.com/about`} />
      </Head>
      <Layout background={home?.cover}>
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
          ]}
        />
        <div className="my-16">
          <div className="container grid gap-4 px-0 md:grid-cols-12 md:px-24">
            <div className="md:col-span-8">
              <p className="text-xl text-primary md:mt-12 md:pr-12">
                {ReactHtmlParser(
                  about?.paragraph1?.replace(/\./g, ".</br>") || ""
                )}
              </p>
            </div>
            <div className="md:col-span-4">
              <Image width={300} height={200} src={"/logo.png"} alt="Logo" />
            </div>
          </div>
        </div>
        <Animate>
          <div className="-ml-12 w-screen lg:-ml-24">
            <AboutBanner text={about?.paragraph2} imageUrl={about?.image} />
          </div>
        </Animate>
        <Animate>
          <div className="mt-20 mb-32 px-12 md:px-24">
            <p className="text-xl font-bold text-primary">
              {ReactHtmlParser(
                about?.paragraph3?.replace(/\./g, ".</br>") || ""
              )}
            </p>
          </div>
        </Animate>
        <ContactSection />
        <div className="md:px-40">
          <Footer info={info} />
        </div>
        <div className="mt-52 mb-12 -ml-12 w-screen lg:-ml-24">
          <FeaturedSection products={featuredProducts} />
        </div>
      </Layout>
    </>
  )
}

export default about
