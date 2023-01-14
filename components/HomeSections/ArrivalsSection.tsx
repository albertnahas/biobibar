import React from "react"
import { Product } from "../../types/product"
import { ProductCard } from "./../ProductCard"

export const ArrivalsSection = ({ products }: { products: Product[] }) => {
  return (
    <section className="new-arrivals ornament-bg-bottom min-h-500 bg-white bg-no-repeat py-12 shadow-2xl">
      <h2 className="my-6 text-center text-3xl">New Arrivals</h2>
      <div className="container">
        <div className="grid justify-center gap-12 md:mx-20 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
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
