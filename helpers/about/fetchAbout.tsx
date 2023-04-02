import axios from "axios"
import _products from "../../data/products.json"
import { About } from "../../types/about"
import { DATABASE_URL, MOCK_ABOUT } from "../constants"
import { MOCK_ABOUT_ITEM } from "../mocks/about"

const fetchAbout = async () => {
  if (MOCK_ABOUT) {
    return {
      ...MOCK_ABOUT_ITEM,
    } as About
  }
  try {
    const { data } = await axios.get(`${DATABASE_URL}/about.json`)
    return data as About
  } catch (error) {
    console.error(error)
    return null
  }
}

export default fetchAbout
