import { ContactForm } from "../ContactForm"

export const ContactSection = () => {
  return (
    <section className="contact mx-auto">
      <h2 className="my-12 text-center text-3xl uppercase">Contact</h2>
      <div className="container">
        <ContactForm />
      </div>
    </section>
  )
}
