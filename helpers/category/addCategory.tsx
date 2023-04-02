import { addAuthToURL } from "../addAuthToURL"
import { DATABASE_URL } from "../constants"

const axios = require("axios")

const addCategory = async (name: string, image?: string) => {
  const postData = JSON.stringify({ name: name, image: image })
  const response = await axios.post(
    await addAuthToURL(`${DATABASE_URL}/categories.json`),
    postData
  )
  return response.data
}

export default addCategory
