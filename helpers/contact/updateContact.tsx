import { Category } from "../../types/category"
import { Contact } from "../../types/contact"
import { addAuthToURL } from "../addAuthToURL"
import { DATABASE_URL } from "../constants"

export async function updateContact(contactId: string, contact: Contact) {
  if (!contactId) {
    throw new Error("Contact ID is required")
  }
  delete contact.id
  const url = await addAuthToURL(`${DATABASE_URL}/contacts/${contactId}.json`)
  const options = {
    method: "PATCH",
    body: JSON.stringify(contact),
  }
  const response = await fetch(url, options)
  return response.json()
}
