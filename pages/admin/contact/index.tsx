import React from "react";
import CustomerCard from "../../../components/CustomerCard";
import Layout from "../../layout";

const customers = [
  {
    id: "1",
    name: "Name",
    phone: "Phone",
    email: "Email Address",
  },
  {
    id: "2",
    name: "Name",
    phone: "Phone",
    email: "Email Address",
  },
];

const Contact = () => {
  return (
    <Layout isAdmin>
      {customers.map(({ id, name, phone, email }) => (
        <CustomerCard
          key={id}
          id={id}
          name={name}
          phone={phone}
          email={email}
        />
      ))}
    </Layout>
  );
};

export default Contact;
