import Head from "next/head"
import React from "react"
import EditInfoSection from "../../components/EditInfoSection"
import EditCoverSection from "../../components/EditCoverSection"
import Layout from "../layout"
import withAuthentication from "../../components/withAuth"

const Home = () => {
  return (
    <>
      <Head>
        <title>Home - BIOBIBAR Admin</title>
        <meta
          name="description"
          content="View, edit or remove home page information: covers, slogan, contact details and working hours"
        />
        <link rel="canonical" href={"https://www.biobibar.com/admin/"} />
      </Head>
      <Layout isAdmin>
        <EditCoverSection />
        <EditInfoSection />
      </Layout>
    </>
  )
}

export default withAuthentication(Home)
