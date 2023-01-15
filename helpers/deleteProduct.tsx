import { DATABASE_URL } from "./constants"
const axios = require("axios")
const deleteProduct = (productId: string) => {
  return axios.delete(`${DATABASE_URL}/products/${productId}.json`)
}

export default deleteProduct
