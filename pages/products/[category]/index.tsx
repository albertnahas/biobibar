import React from "react"
import { ProductCard } from "../../../components/ProductCard"
import Layout from "../../layout"
import Breadcrumb from "../../../components/Breadcrumb"
import { Product } from "../../../types/product"
import fetchProducts from "../../../helpers/fetchProducts"
import fetchCategories from "../../../helpers/fetchCategories"

const Products = ({
  products,
  category,
}: {
  products?: Product[]
  category: string
}) => {
  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Store", path: "/products" },
          { label: category, path: `/products/${category}` },
        ]}
      />
      <div className="container mt-12 px-0 md:px-24">
        {products?.map((product) => (
          <div className="mb-12 grid md:grid-cols-2" key={product.id}>
            <ProductCard
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              description={product.description}
            />
            <div className="pl-3">
              <p>{product.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }: any) {
  const { category } = params
  // this is where you should fetch the product data from database or API
  const products = await fetchProducts(
    category && category !== "all" ? { category: category } : {}
  )
  return {
    props: {
      products,
      category,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  // this is where you should fetch all product ids from database or API
  const categories = await fetchCategories()
  const paths = categories
    .map((category) => `/products/${category.name}`)
    .concat("/products/all")

  return {
    paths,
    fallback: "blocking",
  }
}

export default Products
