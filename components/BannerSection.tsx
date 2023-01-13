import Link from "next/link"

export const BannerSection = () => {
  return (
    <section
      className="banner min-h-500 relative mb-24 bg-cover bg-center bg-no-repeat py-20 px-12 bg-blend-color shadow-2xl shadow-secondary-dark"
      style={{ backgroundImage: `url("/bg.png"), url("/asset1.png")` }}
    >
      <div className="container [&>*]:mt-10">
        <p className="text-center text-3xl text-white">
          Let&apos;s change the feelings in your feet with
        </p>
        <h1 className="text-center text-6xl text-white">BIOBIBAR</h1>
        <p className="text-center text-xl text-white">
          Visit our store or order online to get special discounts
        </p>
        <div className="text-center">
          <Link
            href="/products"
            className="btn-primary rounded-3xl bg-white px-10 py-2 text-2xl uppercase"
          >
            Order now
          </Link>
        </div>
      </div>
    </section>
  )
}
