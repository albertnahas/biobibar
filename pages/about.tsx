import Head from "next/head"
import { Footer } from "../components/Footer"
import { AboutInfo } from "../components/HomeSections/AboutSection"
import fetchInfo from "../helpers/fetchInfo"
import { Info } from "../types/info"
import Layout from "./layout"

export async function getStaticProps() {
  const info = (await fetchInfo()) || {}
  return {
    props: {
      info,
    },
    revalidate: 60,
  }
}

const about = ({ info }: { info?: Info }) => {
  return (
    <>
      <Head>
        <title>About - BIOBIBAR</title>
        <meta name="description" content="About us." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.biobibar.com/about`} />
      </Head>
      <Layout>
        <div className="md:mt-24">
          <AboutInfo about={info?.about} />
        </div>
        <div className="md:px-40">
          <Footer info={info} />
        </div>
      </Layout>
    </>
  )
}

export default about
