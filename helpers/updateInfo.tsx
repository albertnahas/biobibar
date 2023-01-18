import { Info } from "../types/info"
import { addAuthToURL } from "./addAuthToURL"
import { DATABASE_URL } from "./constants"

const axios = require("axios")

const updateInfo = async (info: Info) => {
  const response = await axios.patch(
    await addAuthToURL(`${DATABASE_URL}/info.json`),
    info
  )
  return response.data
}

export default updateInfo
