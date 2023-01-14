import { Category } from "../types/category"
import { DATABASE_URL } from "./constants"

const axios = require("axios")

const fetchCategories = async () => {
  let url = `${DATABASE_URL}/categories.json`
  const response = await axios.get(url)
  const categories = Object.values(response.data) as Category[]
  return categories
}

export default fetchCategories
