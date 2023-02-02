import Head from "next/head";
import React from "react";
import EditAboutSection from "../../components/EditAboutSection";
import Layout from "../layout";
import withAuthentication from "../../components/withAuth";

const About = () => {
  return (
    <>
      <Head>
        <title>About - BIOBIBAR Admin</title>
        <meta name="description" content="View, edit or remove about us page information" />
        <link rel="canonical" href={'https://www.biobibar.com/admin/about'} />
      </Head>
      <Layout isAdmin>
        <EditAboutSection />
      </Layout>
    </>
  );
};

export default withAuthentication(About);
