import { Product } from "../types/product"
import { DATABASE_NAME } from "./constants"

const axios = require("axios")

const fetchProducts = async () => {
  const response = await axios.get(
    `https://${DATABASE_NAME}.firebaseio.com/products.json`
  )
  const products = Object.entries(response.data).map((e: [string, unknown]) => {
    let product = e[1] as Product
    product.id = e[0]
    return product
  }) as Product[]
  return products
}

export default fetchProducts
