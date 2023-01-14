import { Product } from "../types/product"
import { DATABASE_URL } from "./constants"

const axios = require("axios")

const addProduct = async (product: Product) => {
  const postData = JSON.stringify(product)
  const response = await axios.post(`${DATABASE_URL}/products.json`, postData)
  return response.data
}

export default addProduct
