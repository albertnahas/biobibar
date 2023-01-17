import Head from "next/head"
import { Footer } from "../components/Footer"
import { ContactSection } from "../components/HomeSections/ContactSection"
import fetchInfo from "../helpers/fetchInfo"
import { Info } from "../types/info"
import Layout from "./layout"

export async function getStaticProps() {
  const info = await fetchInfo()

  return {
    props: {
      info,
    },
    revalidate: 60,
  }
}

const contact = ({ info }: { info: Info }) => {
  return (
    <>
      <Head>
        <title>Contact - BIOBIBAR</title>
        <meta name="description" content="Contact us." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.biobibar.com/contact`} />
      </Head>
      <Layout>
        <div className="md:px-40">
          <ContactSection />
          <Footer info={info} />
        </div>
      </Layout>
    </>
  )
}

export default contact
