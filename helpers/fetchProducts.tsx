import { Product } from "../types/product"
import { DATABASE_URL, MOCK_PRODUCTS } from "./constants"
import _products from "../data/products.json"

const axios = require("axios")

const limit = 12

const fetchProducts = async (options?: FetchProductsOptions) => {
  let response
  if (MOCK_PRODUCTS) {
    response = { data: _products }
  } else {
    const { featured, category, newArrivals, startAt } = options || {}
    let url = `${DATABASE_URL}/products.json`
    if (featured) {
      url += `?orderBy="isFeatured"&equalTo=true`
    } else if (newArrivals) {
      url += `?orderBy="isNew"&equalTo=true`
    } else if (category) {
      url += `?orderBy="category"&equalTo="${category}"`
    } else if (startAt) {
      url += `?orderBy="$key"&startAt="${startAt}"&limitToFirst=${limit}`
    }
    response = await axios.get(url)
  }

  const products = Object.entries(response.data).map((e: [string, unknown]) => {
    let product = e[1] as Product
    product.id = e[0]
    return product
  }) as Product[]
  return products
}

export default fetchProducts

interface FetchProductsOptions {
  featured?: boolean
  newArrivals?: boolean
  category?: string
  startAt?: string
}
