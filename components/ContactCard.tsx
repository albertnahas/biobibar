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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6 lg:px-24">
          <h3>
            customer
            <small className="block text-gray-400">
              {moment(createdAt).fromNow()}
            </small>
          </h3>
          <input
            type="text"
            className="input-readonly"
            placeholder={name}
            readOnly
          />
          <input
            type="text"
            className="input-readonly"
            placeholder={phone}
            readOnly
          />
          <input
            type="email"
            className="input-readonly"
            placeholder={email}
            readOnly
          />
          {source ? (
            <input
              type="text"
              className="input-readonly"
              placeholder={source}
              readOnly
            />
          ) : (
            <>-</>
          )}
          <input
            type="checkbox"
            className="mt-3 rounded-full text-secondary shadow focus:ring-secondary"
            name="isFeatured"
            checked={read}
            onChange={(e) => {
              onCheckRead(id || "", e.target.checked)
            }}
          />
        </div>
      </section>
      <hr className="mb-4 md:mb-4" />
    </>
  )
}

export default ContactCard
