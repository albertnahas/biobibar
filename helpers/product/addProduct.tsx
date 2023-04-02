import { Product } from "../../types/product"
import { DATABASE_URL } from "../constants"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "../config"
import { getAuth } from "firebase/auth"
import { addAuthToURL } from "../addAuthToURL"
const app = initializeApp(firebaseConfig)

const axios = require("axios")

const addProduct = async (product: Product) => {
  const auth = getAuth(app)
  const token = await auth.currentUser?.getIdToken()
  const postData = JSON.stringify({
    ...product,
    createdAt: new Date().toISOString(),
  })
  const response = await axios.post(
    await addAuthToURL(`${DATABASE_URL}/products.json`),
    postData
  )
  return response.data
}

export default addProduct
