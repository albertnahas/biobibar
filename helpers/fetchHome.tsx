import axios from "axios"
import _products from "../data/products.json"
import { Home } from "../types/home"
import { DATABASE_URL, MOCK_INFO } from "./constants"

const fetchHome = async () => {
  if (MOCK_INFO) {
    return {
      cover: "/asset1.png",
      cover2: "/asset2.png",
      cover3: "/asset3.png",
      logo: "/logo.png",
      logoDark: "/logo-dark.png",
      slogan: "من عبق حلب بدأنا....",
    } as Home
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
