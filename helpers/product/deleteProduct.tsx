import { addAuthToURL } from "../addAuthToURL"
import { DATABASE_URL } from "../constants"
const axios = require("axios")
const deleteProduct = async (productId: string) => {
  return axios.delete(
    await addAuthToURL(`${DATABASE_URL}/products/${productId}.json`)
  )
}

export default deleteProduct
