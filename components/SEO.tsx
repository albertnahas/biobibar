import Head from "next/head"
import React from "react"

export const SEO = () => {
  return (
    <Head>
      <title>BIOBIBAR</title>
      <meta
        name="description"
        content="BIOBIBAR - From Aleppo, we started...."
      />
      <meta
        name="keywords"
        content="organic, natural, products, health, wellness,soap, biobibar"
      />
      <meta property="og:title" content="BIOBIBAR" />
      <meta
        property="og:description"
        content="BIOBIBAR - From Aleppo, we started...."
      />
      <meta property="og:image" content="/logo.png" />
      <meta property="og:url" content="https://biobibar.com" />
      <meta property="og:site_name" content="BIOBIBAR" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="BIOBIBAR" />
      <meta
        name="twitter:description"
        content="BIOBIBAR - From Aleppo, we started...."
      />
      <meta name="twitter:image" content="/logo.png" />
      <meta name="twitter:site" content="@biobibar" />
      <meta name="twitter:creator" content="@biobibar" />
    </Head>
  )
}
