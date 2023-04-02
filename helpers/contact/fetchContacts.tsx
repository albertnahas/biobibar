import { Contact } from "../../types/contact"
import { DATABASE_URL } from "../constants"

const axios = require("axios")

const fetchContacts = async () => {
  let url = `${DATABASE_URL}/contacts.json?orderBy="createdAt"&limitToLast=100`
  const response = await axios.get(url)
  const contacts = Object.entries(response.data).map((e: [string, unknown]) => {
    let contact = e[1] as Contact
    contact.id = e[0]
    return contact
  }) as Contact[]
  return contacts.reverse()
}

export default fetchContacts
