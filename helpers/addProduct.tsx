import { Product } from "../types/product"
import { DATABASE_NAME } from "./constants"

const axios = require("axios")

const addProduct = async (product: Product) => {
  const postData = JSON.stringify(product)
  const response = await axios.post(
    `https://${DATABASE_NAME}.firebaseio.com/products.json`,
    postData
  )
  return response.data
}

export default addProduct
