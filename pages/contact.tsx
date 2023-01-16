import Head from "next/head"
import { ContactSection } from "../components/HomeSections/ContactSection"
import Layout from "./layout"

const contact = () => {
  return (
    <>
      <Head>
        <title>Contact - BIOBIBAR</title>
        <meta name="description" content="Contact us." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.biobibar.com/contact`} />
      </Head>
      <Layout>
        <div className="h-400">
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}

export default contact
