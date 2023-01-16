import React from "react"
import CustomerCard from "../../components/CustomerCard"
import withAuthentication from "../../components/withAuth"
import Layout from "../layout"

const customers = [
  {
    name: "Albert",
    phone: "Phone",
    email: "Email Address",
  },
  {
    name: "Name",
    phone: "Phone",
    email: "Email Address",
  },
]

const Contact = () => {
  return (
    <Layout isAdmin>
      {customers.map(({ name, phone, email }) => (
        <CustomerCard key={name} name={name} phone={phone} email={email} />
      ))}
    </Layout>
  )
}

export default withAuthentication(Contact)
