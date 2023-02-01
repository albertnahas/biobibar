import Head from "next/head";
import React, { useState, useEffect } from "react";
import ContactCard from "../../components/ContactCard";
import fetchContacts from "../../helpers/contact/fetchContacts";
import withAuthentication from "../../components/withAuth";
import { Contact } from "../../types/contact";
import Layout from "../layout";
import { updateContact } from "../../helpers/contact/updateContact";
import { toast } from "react-toastify";

const Contact = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts().then((res) => {
      setContacts(res);
    });
  }, []);

  const onCheckRead = (id: string, checked?: boolean) => {
    const contact = contacts.find((c) => c.id === id);
    if (!contact) return;
    contact.read = checked;
    setContacts([...contacts]);
    updateContact(id, { ...contact, read: checked || false })
      .then(() => {})
      .catch((e) => {
        toast.error("Something went wrong please try again later");
      });
  };

  return (
    <>
      <Head>
        <title>Contact - BIOBIBAR Admin</title>
        <meta name="description" content="View list of customers contacts" />
        <link rel="canonical" href={`https://www.biobibar.com/admin/contact`} />
      </Head>
      <Layout isAdmin>
        <h2 className="mt-8 mb-4 text-xl">Customer information</h2>

        {contacts.map(({ id, name, phone, email, source, read, createdAt }) => (
          <ContactCard
            key={id}
            id={id}
            name={name}
            read={read}
            phone={phone}
            email={email}
            source={source}
            createdAt={createdAt}
            onCheckRead={onCheckRead}
          />
        ))}
      </Layout>
    </>
  );
};

export default withAuthentication(Contact);
