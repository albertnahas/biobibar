import { initializeApp } from "firebase/app"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { firebaseConfig } from "./config"

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

const MAX_FILE_SIZE = 2048 // 2MB
// Function to upload an image and get its URL
export const uploadImage = async (file: File) => {
  const fileSizeKiloBytes = file.size / 1024
  if (fileSizeKiloBytes > MAX_FILE_SIZE) {
    throw new Error("File size is too large")
  }
  // images is the folder in storage, file.name is the new image name
  const imageRef = ref(storage, `images/${file.name}`)

  // Upload the file to the reference
  const snapshot = await uploadBytesResumable(imageRef, file)
  // Get the image URL
  const imageUrl = await getDownloadURL(snapshot.ref)
  return imageUrl
}
