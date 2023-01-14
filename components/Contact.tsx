export const Contact = () => {
  return (
    <section className="contact">
      <h2 className="my-12 text-center text-3xl uppercase">Contact</h2>
      <div className="container">
        <form>
          <div className="grid gap-8 px-12 md:grid-cols-4 md:px-24">
            <input type="text" className="input" placeholder="Name" />
            <input type="text" className="input" placeholder="Phone" />
            <input type="email" className="input" placeholder="Email Address" />
            <button className="btn-secondary uppercase">Contact us</button>
          </div>
        </form>
      </div>
    </section>
  );
};