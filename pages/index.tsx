import { FC, useEffect, useState } from "react"
import { AboutSection } from "../components/HomeSections/AboutSection"
import { ContactSection } from "../components/HomeSections/ContactSection"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import fetchCategories from "../helpers/categories/fetchCategories"
import fetchProducts from "../helpers/products/fetchProducts"
import { Category } from "../types/category"
import { Product } from "../types/product"
import { ArrivalsSection } from "../components/HomeSections/ArrivalsSection"
import { BannerSection } from "../components/HomeSections/BannerSection"
import { CategoriesSection } from "../components/HomeSections/CategoriesSection"
import { FeaturedSection } from "../components/HomeSections/FeaturedSection"
import { HeroSection } from "../components/HomeSections/HeroSection"
import fetchHome from "../helpers/home/fetchHome"
import { Home } from "../types/home"
import fetchInfo from "../helpers/info/fetchInfo"
import { Info } from "../types/info"
import { Animate } from "../components/Animate"
import Head from "next/head"

export async function getStaticProps() {
  const home = await fetchHome()
  const info = await fetchInfo()
  const allProducts = await fetchProducts()
  const newProducts = allProducts.filter((product) => product.isNew)
  const featuredProducts = allProducts.filter((product) => product.isFeatured)
  const categories = await (
    await fetchCategories()
  ).map((category) => ({
    ...category,
    productsCount: allProducts.filter(
      (product) => product.category === category.name
    ).length,
  }))

  return {
    props: {
      home,
      info,
      newProducts,
      featuredProducts,
      categories,
    },
    revalidate: 10,
  }
}

const Home: FC<Props> = ({
  newProducts,
  featuredProducts,
  categories,
  home,
  info,
}) => {
  return (
    <>
      <Head>
        <title>Home - BIOBIBAR</title>
      </Head>
      <div>
        <Navbar />
        <HeroSection coverUrl={home.cover} slogan={home.slogan} />
        <Animate>
          <AboutSection about={info.about} />
        </Animate>
        <FeaturedSection coverUrl={home.cover2} products={featuredProducts} />
        <Animate>
          <ArrivalsSection products={newProducts} />
        </Animate>
        <CategoriesSection categories={categories} />
        <BannerSection coverUrl={home.cover3} slogan={home.slogan2} />
        <Animate>
          <div className="md:px-40 md:pt-40">
            <ContactSection />
            <Footer info={info} />
          </div>
        </Animate>
        <Navbar bottom={true} />
      </div>
    </>
  )
}

export default Home

interface Props {
  home: Home
  info: Info
  newProducts: Product[]
  featuredProducts: Product[]
  categories: Category[]
}
