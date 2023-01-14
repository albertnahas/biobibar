import React from "react";
import { customer } from "../types/customer";

const CustomerCard = ({ name, email, phone }: customer) => {
  return (
    <section className="contact">
      <div className="container ml-24 p-4">
        <h2 className="my-12 text-xl">Customer information</h2>
        <h3 className="my-12">customer</h3>
      </div>

      <div className="container mx-auto my-4">
        <div className="grid gap-8 px-12 md:grid-cols-3 md:px-24">
          <input
            type="text"
            className="input input-readonly"
            placeholder={name}
            readOnly
          />
          <input
            type="text"
            className="input input-readonly"
            placeholder={phone}
            readOnly
          />
          <input
            type="email"
            className="input input-readonly"
            placeholder={email}
            readOnly
          />
        </div>
      </div>
    </section>
  );
};

export default CustomerCard;
