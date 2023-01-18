import React from "react"
import CustomerCard from "../../components/CustomerCard"
import withAuthentication from "../../components/withAuth"
import Layout from "../layout"

const customers = [
  {
    name: "Albert",
    phone: "Phone",
    email: "Email Address",
    source: "Test"
  },
  {
    name: "Name",
    phone: "Phone",
    email: "Email Address",
    source: "Test"
  },
]

const Contact = () => {
  return (
    <Layout isAdmin>
      {customers.map(({ name, phone, email, source }) => (
        <CustomerCard
          key={name}
          name={name}
          phone={phone}
          email={email}
          source={source}
        />
      ))}
    </Layout>
  )
}

export default withAuthentication(Contact)
