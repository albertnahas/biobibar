import { DATABASE_URL } from "./constants"

const axios = require("axios")

const addCategory = async (category: string) => {
  const postData = JSON.stringify({ name: category })
  const response = await axios.post(`${DATABASE_URL}/categories.json`, postData)
  return response.data
}

export default addCategory
