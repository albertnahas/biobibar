import Head from "next/head"
import { Footer } from "../components/Footer"
import { ContactSection } from "../components/HomeSections/ContactSection"
import fetchHome from "../helpers/home/fetchHome"
import fetchInfo from "../helpers/info/fetchInfo"
import Breadcrumb from "../molecules/Breadcrumb"
import { Home } from "../types/home"
import { Info } from "../types/info"
import Layout from "./layout"

export async function getStaticProps() {
  const info = await fetchInfo()
  const home = await fetchHome()

  return {
    props: {
      home,
      info,
    },
    revalidate: 10,
  }
}

const contact = ({ info, home }: { info: Info; home: Home }) => {
  return (
    <>
      <Head>
        <title>Contact - BIOBIBAR</title>
        <meta name="description" content="Contact us." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.biobibar.com/contact`} />
      </Head>
      <Layout background={home.cover}>
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Contact", path: "/contact" },
          ]}
        />
        <div className="md:px-40">
          <ContactSection />
          <Footer info={info} />
        </div>
      </Layout>
    </>
  )
}

export default contact
