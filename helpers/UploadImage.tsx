import { initializeApp } from "firebase/app"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"
import { firebaseConfig } from "./config"

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

const MAX_FILE_SIZE = 3072 // 3MB
// Function to upload an image and get its URL
export const uploadImage = async (file: File, oldFileUrl?: string) => {
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

  // Remove old file from the storage
  if (imageUrl && !oldFileUrl?.includes("placeholder-image")) {
    const decodedOldFileUrl = decodeURIComponent(
      decodeURIComponent(oldFileUrl!)
    );
    const oldFileName = decodedOldFileUrl.split("/images/")[1].split("?")[0]
    const oldImageRef = ref(storage, `images/${oldFileName}`)
    if (oldImageRef) {
      try {
        await deleteObject(oldImageRef)
        console.log("The old image has been removed from the database")
      } catch (e: any) {
        console.log("Error deleting old image from the database: ", e.message)
      }
    }
  }
  return imageUrl
}
