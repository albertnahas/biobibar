import axios from "axios"
import _products from "../data/products.json"
import { Product } from "../types/product"
import { DATABASE_URL, MOCK_PRODUCTS } from "./constants"

const fetchProduct = async (productId: string) => {
  if (MOCK_PRODUCTS) {
    return _products[productId as keyof typeof _products] as Product
  }
  try {
    const { data } = await axios.get(
      `${DATABASE_URL}/products/${productId}.json`
    )
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export default fetchProduct
