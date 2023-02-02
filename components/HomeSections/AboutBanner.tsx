import ReactHtmlParser from "react-html-parser"

export const AboutBanner = ({
  text,
  imageUrl,
}: {
  imageUrl?: string
  text?: string
}) => {
  return (
    <section className="min-h-300 w-full relative my-24 mb-24 bg-secondary-dark2 py-12 px-12 shadow-2xl shadow-secondary-dark">
      <div className="container grid gap-12 px-0 md:grid-cols-2 lg:px-24">
        <div className="py-4 md:col-span-1">
          <p className="text-white">
            {ReactHtmlParser(text?.replace(/\./g, ".</br>") || "")}
          </p>
        </div>
        <div
          className="h-full min-h-200 bg-cover bg-center bg-no-repeat px-12 opacity-70 bg-blend-color"
          style={{
            backgroundImage: `linear-gradient(
              var(--secondary),
              var(--secondary)
            ),url(${imageUrl || "./asset4.png"})`,
          }}
        ></div>
      </div>
    </section>
  )
}
