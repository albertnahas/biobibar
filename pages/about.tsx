import Head from "next/head"
import { AboutInfo } from "../components/HomeSections/AboutSection"
import fetchInfo from "../helpers/fetchInfo"
import Layout from "./layout"

export async function getStaticProps() {
  const { about } = (await fetchInfo()) || {}
  return {
    props: {
      about,
    },
    revalidate: 60,
  }
}

const about = ({ about }: { about?: string }) => {
  return (
    <>
      <Head>
        <title>About - BIOBIBAR</title>
        <meta name="description" content="About us." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.biobibar.com/about`} />
      </Head>
      <Layout>
        <div className="my-24">
          <AboutInfo about={about} />
        </div>
      </Layout>
    </>
  )
}

export default about
