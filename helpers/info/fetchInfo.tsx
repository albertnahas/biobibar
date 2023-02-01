import axios from "axios"
import _products from "../../data/products.json"
import { Info } from "../../types/info"
import { DATABASE_URL, MOCK_INFO } from "../constants"
import { MOCK_INFO_ITEM } from "../mocks/info"

const fetchInfo = async () => {
  if (MOCK_INFO) {
    return { ...MOCK_INFO_ITEM } as Info
  }
  try {
    const { data } = await axios.get(`${DATABASE_URL}/info.json`)
    return data as Info
  } catch (error) {
    console.error(error)
    return null
  }
}

export default fetchInfo
