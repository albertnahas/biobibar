import { Category } from "../types/category"
import { DATABASE_URL } from "./constants"

const axios = require("axios")

const fetchCategories = async () => {
  let url = `${DATABASE_URL}/categories.json`
  const response = await axios.get(url)
  const categories = Object.entries(response.data).map(
    (e: [string, unknown]) => {
      let product = e[1] as Category
      product.id = e[0]
      return product
    }
  ) as Category[]
  return categories
}

export default fetchCategories
