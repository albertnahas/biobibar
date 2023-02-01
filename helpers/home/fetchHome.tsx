import axios from "axios"
import _products from "../../data/products.json"
import { Home } from "../../types/home"
import { DATABASE_URL, MOCK_INFO } from "../constants"
import { MOCK_HOME_ITEM } from "../mocks/home"

const fetchHome = async () => {
  if (MOCK_INFO) {
    return { ...MOCK_HOME_ITEM } as Home
  }
  try {
    const { data } = await axios.get(`${DATABASE_URL}/home.json`)
    return data as Home
  } catch (error) {
    console.error(error)
    return null
  }
}

export default fetchHome
