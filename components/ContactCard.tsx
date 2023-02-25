import moment from "moment"
import React from "react"
import { Contact } from "../types/contact"

const ContactCard = (
  contact: Contact & { onCheckRead: (id: string, checked?: boolean) => void }
) => {
  const { id, name, phone, email, source, createdAt, read, onCheckRead } =
    contact
  return (
    <>
      <section
        className={`contact rounded-lg py-2 ${read ? "bg-gray-100" : ""}`}
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:px-24">
          <div className="flex gap-4">
            <input
              type="checkbox"
              className="mt-3 rounded-full text-secondary shadow focus:ring-secondary"
              name="isFeatured"
              checked={read}
              onChange={(e) => {
                onCheckRead(id || "", e.target.checked)
              }}
            />
            <h3>
              customer
              <small className="block text-gray-400">
                {moment(createdAt).fromNow()}
              </small>
            </h3>
          </div>
          <div>
            <p>{name}</p>
            <small>{email}</small>
          </div>
          <p>{phone}</p>
          <p>{source}</p>
        </div>
      </section>
      <hr className="mb-4 md:mb-4" />
    </>
  )
}

export default ContactCard
