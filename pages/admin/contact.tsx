import React, { useState, useEffect } from "react";
import ContactCard from "../../components/ContactCard";
import fetchContacts from "../../helpers/fetchContacts";
import { Contact } from "../../types/contact";
import Layout from "../layout";

const Contact = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts().then((res) => {
      setContacts(res)
    })
  }, [])

  return (
    <Layout isAdmin>
      {contacts.map(({ name, phone, email, source }) => (
        <ContactCard
          key={name}
          name={name}
          phone={phone}
          email={email}
          source={source}
        />
      ))}
    </Layout>
  );
};

export default Contact;
