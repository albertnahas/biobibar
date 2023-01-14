import { Home } from "../types/home"
import { DATABASE_URL } from "./constants"

const axios = require("axios")

const updateHome = async (home: Home) => {
  const response = await axios.patch(`${DATABASE_URL}/home.json`, home)
  return response.data
}

export default updateHome
