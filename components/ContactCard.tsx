import React from "react";
import { Contact } from "../types/contact";

const ContactCard = ({ name, email, phone, source }: Contact) => {
  return (
    <section className="contact">
      <div className="container ml-12 p-4">
        <h2 className="mt-8 mb-4 text-xl">Customer information</h2>
        <h3 className="mb-2">customer</h3>
      </div>

      <div className="container mx-auto my-2">
        <div className="grid gap-8 px-12 md:grid-cols-4 md:px-24">
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
          <input
            type="text"
            className="input-readonly"
            placeholder={source}
            readOnly
          />
        </div>
      </div>
    </section>
  );
};

export default ContactCard;
