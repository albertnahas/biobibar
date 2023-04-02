import React, { FC } from "react"
import { Category } from "../../types/category"
import { CategoryCard } from "./../CategoryCard"
export const CategoriesSection: FC<Props> = ({ categories }) => {
  return (
    <section className="categories pb-24">
      <h2 className="my-14 text-center text-3xl uppercase">Main Categories</h2>
      <div className="container m-auto">
        <div className="mx-12 grid gap-12 md:mx-20 md:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              title={category.name}
              image={category.image}
              productCount={category.productsCount}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface Props {
  categories: Category[]
}
