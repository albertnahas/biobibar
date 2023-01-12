import React from "react"
import { CategoryCard } from "./CategoryCard"
export const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      title: "Category 1",
      image: "/path/to/category1.jpg",
      productCount: 12,
    },
    {
      id: 2,
      title: "Category 2",
      image: "/path/to/category2.jpg",
      productCount: 20,
    },
    {
      id: 3,
      title: "Category 3",
      image: "/path/to/category3.jpg",
      productCount: 8,
    },
    {
      id: 4,
      title: "Category 4",
      image: "/path/to/category4.jpg",
      productCount: 15,
    },
  ]

  return (
    <section className="categories">
      <h2 className="my-14 text-center text-3xl uppercase">Main Categories</h2>
      <div className="container">
        <div className="mx-20 grid gap-12 md:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              //   image={category.image}
              productCount={category.productCount}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
