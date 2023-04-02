import { About } from "../../types/about"
import { addAuthToURL } from "../addAuthToURL"
import { DATABASE_URL } from "../constants"

const axios = require("axios")

const updateAbout = async (about: About) => {
  const response = await axios.patch(
    await addAuthToURL(`${DATABASE_URL}/about.json`),
    about
  )
  return response.data
}

export default updateAbout
