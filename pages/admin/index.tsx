import React from "react"
import EditInfoSection from "../../components/EditInfoSection"
import EditCoverSection from "../../components/EditCoverSection"
import Layout from "../layout"
import withAuthentication from "../../components/withAuth"

const Home = () => {
  return (
    <Layout isAdmin>
      <EditCoverSection />
      <EditInfoSection />
    </Layout>
  )
}

export default withAuthentication(Home)
