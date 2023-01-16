import { DATABASE_URL } from "./constants"
const axios = require("axios")
const deleteCategory = (categoryId: string) => {
  return axios.delete(`${DATABASE_URL}/categories/${categoryId}.json`)
}

export default deleteCategory
