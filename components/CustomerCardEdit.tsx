import React, { FC } from "react";
import Input from "./Input";

const CustomerCardEdit: FC<Props> = ({ name, email, phone, title }) => {
  return (
    <section className="contact">
      <div className="container ml-24 p-4">
        <h2 className="my-12 text-xl">{title}</h2>
        <h3 className="my-12">customer</h3>
      </div>

      <div className="container mx-auto my-4">
        <form>
          <div className="grid gap-8 px-12 md:grid-cols-3 md:px-24">
            <Input type="text" className="input input-readonly" placeholder={name} readOnly />
            <Input type="text" className="input input-readonly" placeholder={phone} readOnly />
            <Input
              type="email"
              className="input input-readonly"
              placeholder={email}
              readOnly
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default CustomerCardEdit;

interface Props {
  name: string;
  phone: string;
  email: string;
  title: string;
}
