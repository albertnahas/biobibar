import Link from "next/link"
import React from "react"
import { CloseButton } from "../atoms/CloseButton"
import { Product } from "../types/product"

export const ProductsTable = ({
  products,
  onDelete,
}: {
  products: Product[]
  onDelete: (product: Product) => void
}) => {
  return (
    <table
      className="[&_td]:border-b-1 w-full [&_td]:border-primary [&_td]:p-2 [&_th]:border-b-2
[&_th]:border-primary [&_th]:p-2"
    >
      <thead>
        <tr>
          <th className=" text-dark">Product Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.title}</td>
            <td className="text-center">{product.category}</td>
            <td className="text-center">{product.price}</td>
            <td className="text-center">
              <Link
                href={`/admin/products/${product.id}`}
                className="btn-primary-sm"
              >
                Edit
              </Link>
            </td>
            <td className="text-center">
              <CloseButton
                transparent={true}
                onClick={onDelete.bind(null, product)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
