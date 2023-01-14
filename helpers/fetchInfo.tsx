import axios from "axios"
import _products from "../data/products.json"
import { Info } from "../types/info"
import { DATABASE_URL, MOCK_INFO } from "./constants"

const fetchInfo = async () => {
  if (MOCK_INFO) {
    return {
      address: "1234 Main St",
      about: "This is a mock about",
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      hours: "9am - 5pm",
      phone: "123-456-7890",
      telegram: "https://www.telegram.com",
    } as Info
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
