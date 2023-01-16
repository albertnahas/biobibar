import { Category } from "../types/category"
import { addAuthToURL } from "./addAuthToURL"
import { DATABASE_URL } from "./constants"

export async function updateCategory(categoryId: string, name: string) {
  let updates = {
    name: name,
  }

  const url = await addAuthToURL(`${DATABASE_URL}/categories/${categoryId}.json`)
  const options = {
    method: "PATCH",
    body: JSON.stringify(updates),
  }
  const response = await fetch(url, options)
  return response.json()
}
