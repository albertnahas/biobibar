import React, { FC } from "react";
import CustomerCardEdit from "../../../components/CustomerCardEdit";
import { Navbar } from "../../../components/Navbar";

const customers = [
  {
    id: 1,
    name: "Name",
    phone: "Phone",
    email: "Email Address",
  },
  {
    id: 2,
    name: "Name",
    phone: "Phone",
    email: "Email Address",
  },
];

const Contact: FC<Props> = () => {
  return (
    <div>
      <Navbar />
      <div>
        {customers.map(({ id, name, phone, email }) => (
          <CustomerCardEdit
            key={id}
            name={name}
            phone={phone}
            email={email}
            title="Customer information"
          />
        ))}
      </div>
      <Navbar bottom={true} />
    </div>
  );
};

export default Contact;

interface Props {
  id: number;
  name: string;
  phone: string;
  email: string;
  title: string;
}
