import { Product } from "../../types/product"
import { addAuthToURL } from "../addAuthToURL"
import { DATABASE_URL } from "../constants"

export async function updateProduct(productId: string, product: Product) {
  let updates = {
    ...product,
  }
  delete updates.id

  const url = await addAuthToURL(`${DATABASE_URL}/products/${productId}.json`)
  const options = {
    method: "PATCH",
    body: JSON.stringify(updates),
  }
  const response = await fetch(url, options)
  return response.json()
}
