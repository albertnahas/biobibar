import React from "react"
import { ProductCard } from "./ProductCard"

const products = [
  {
    id: 1,
    title: "Product 1",
    description: "Description 1",
    price: 99.99,
    image: "/path/to/product1.jpg",
  },
  {
    id: 2,
    title: "Product 2",
    description: "Description 2",
    price: 89.99,
    image: "/path/to/product2.jpg",
  },
  {
    id: 3,
    title: "Product 3",
    description: "Description 3",
    price: 79.99,
    image: "/path/to/product3.jpg",
  },
  {
    id: 4,
    title: "Product 4",
    description: "Description 4",
    price: 69.99,
    image: "/path/to/product4.jpg",
  },
  {
    id: 5,
    title: "Product 5",
    description: "Description 5",
    price: 59.99,
    image: "/path/to/product5.jpg",
  },
  {
    id: 6,
    title: "Product 6",
    description: "Description 6",
    price: 49.99,
    image: "/path/to/product6.jpg",
  },
  {
    id: 7,
    title: "Product 7",
    description: "Description 7",
    price: 39.99,
    image: "/path/to/product7.jpg",
  },
  {
    id: 8,
    title: "Product 8",
    description: "Description 8",
    price: 29.99,
    image: "/path/to/product8.jpg",
  },
]

export const ArrivalsSection = () => {
  return (
    <section className="new-arrivals bg-white ornament-bg-bottom min-h-500 bg-no-repeat py-12 shadow-2xl">
      <h2 className="my-6 text-center text-3xl">New Arrivals</h2>
      <div className="container">
        <div className="mx-20 grid gap-12 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
