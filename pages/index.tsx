import { FC } from "react"
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

export async function getStaticProps() {
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
      newProducts,
      featuredProducts,
      categories,
    },
    revalidate: 60,
  }
}

const Home: FC<Props> = ({ newProducts, featuredProducts, categories }) => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturedSection products={featuredProducts} />
      <ArrivalsSection products={newProducts} />
      <CategoriesSection categories={categories} />
      <BannerSection />
      <div className="md:px-40 md:pt-40">
        <ContactSection />
        <Footer />
      </div>
      <Navbar bottom={true} />
    </div>
  )
}

export default Home

interface Props {
  newProducts: Product[]
  featuredProducts: Product[]
  categories: Category[]
}
