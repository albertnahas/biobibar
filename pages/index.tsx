import { FC, useEffect } from "react"
import { AboutSection } from "../components/HomeSections/AboutSection"
import { ContactSection } from "../components/HomeSections/ContactSection"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import fetchCategories from "../helpers/fetchCategories"
import fetchProducts from "../helpers/fetchProducts"
import { Category } from "../types/category"
import { Product } from "../types/product"
import { ArrivalsSection } from "../components/HomeSections/ArrivalsSection"
import { BannerSection } from "../components/HomeSections/BannerSection"
import { CategoriesSection } from "../components/HomeSections/CategoriesSection"
import { FeaturedSection } from "../components/HomeSections/FeaturedSection"
import { HeroSection } from "../components/HomeSections/HeroSection"
import fetchHome from "../helpers/fetchHome"
import { Home } from "../types/home"
import updateCover from "../helpers/updateHome"
import fetchInfo from "../helpers/fetchInfo"
import { Info } from "../types/info"

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
    revalidate: 60,
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
    <div>
      <Navbar />
      <HeroSection coverUrl={home.cover} slogan={home.slogan} />
      <AboutSection />
      <FeaturedSection coverUrl={home.cover2} products={featuredProducts} />
      <ArrivalsSection products={newProducts} />
      <CategoriesSection categories={categories} />
      <BannerSection coverUrl={home.cover3} />
      <div className="md:px-40 md:pt-40">
        <ContactSection />
        <Footer info={info} />
      </div>
      <Navbar bottom={true} />
    </div>
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
