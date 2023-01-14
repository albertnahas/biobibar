import { Info } from "../types/info"
import { DATABASE_URL } from "./constants"

const axios = require("axios")

const updateInfo = async (info: Info) => {
  const response = await axios.patch(`${DATABASE_URL}/info.json`, info)
  return response.data
}

export default updateInfo
