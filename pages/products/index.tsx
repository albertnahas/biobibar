import React from "react"
import { ProductCard } from "../../components/ProductCard"
import Layout from "../layout"
import Breadcrumb from "../../components/Breadcrumb"
import { Product } from "../../types/product"

export const products: Product[] = [
  {
    id: "1",
    title: "Product 1",
    image: "/product1.jpg",
    price: 19.99,
    description: "This is a sample product",
    text: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod. Quisquam, quod. Quisquam, quod.",
  },
  {
    id: "2",
    title: "Product 2",
    image: "/product2.jpg",
    price: 29.99,
    description: "This is another sample product",
    text: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod. Quisquam, quod. Quisquam, quod.",
  },
  {
    id: "3",
    title: "Product 3",
    image: "/product3.jpg",
    price: 29.99,
    description: "This is another sample product",
    text: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod. Quisquam, quod. Quisquam, quod.",
  },
]

const Products = () => {
  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Store", path: "/store" },
          { label: "Category", path: "/category" },
        ]}
      />
      <div className="container mt-12 px-12 md:px-24">
        {products.map((product) => (
          <div className="mb-12 grid grid-cols-2" key={product.id}>
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

export default Products
