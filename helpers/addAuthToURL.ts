import { initializeApp } from "firebase/app"
import { firebaseConfig } from "./config"
import { getAuth } from "firebase/auth"
const app = initializeApp(firebaseConfig)

export const addAuthToURL = async (url: string) => {
    const auth = getAuth(app)
    const token = await auth.currentUser?.getIdToken()
    return `${url}?auth=${token}`;
}