import Link from "next/link"
import React, { useState, useEffect } from "react"
import { ReactSVG } from "react-svg"
import DeleteConfirmation from "../../../molecules/DeleteConfirmation"
import deleteProduct from "../../../helpers/deleteProduct"
import fetchProducts from "../../../helpers/fetchProducts"
import { Product } from "../../../types/product"
import Layout from "../../layout"
const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [showConfirm, setShowConfirm] = useState(false)

  const fetchData = () => {
    fetchProducts().then((data) => setProducts(data))
  }
  useEffect(() => {
    // fetchData()
  }, [])

  const onDeleteConfirm = () => {
    if (selectedProduct && selectedProduct.id) {
      deleteProduct(selectedProduct.id).then(() => {
        fetchData()
        setShowConfirm(false)
      })
    }
  }
  const onCancelDelete = () => {
    setShowConfirm(false)
  }

  return (
    <Layout isAdmin>
      <h1 className="text-dark flex items-center text-3xl font-bold text-primary">
        Products
        <Link href="/admin/products/new">
          <ReactSVG src="/plus.svg" className="ml-4 inline-block h-8 w-8" />
        </Link>
      </h1>
      <div className=" min-h-300">
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
                  <button
                    onClick={() => {
                      setSelectedProduct(product)
                      setShowConfirm(true)
                    }}
                    className="text-secondary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!products.length && (
          <div className="flex justify-center">
            <button
              className="btn-primary-sm m-8 text-xl font-bold"
              onClick={fetchData}
            >
              View Products
            </button>
          </div>
        )}
      </div>

      {showConfirm && (
        <DeleteConfirmation
          onCancel={onCancelDelete}
          onConfirm={onDeleteConfirm}
        />
      )}
    </Layout>
  )
}

export default ProductsAdmin
