import Image from "next/image"

export const HeroSection = () => {
  return (
    <section className="hero-bg absolute-top flex flex-col h-screen-2 items-center justify-center">
      <Image
        src="/logo.png"
        className="md:h-80 md:w-80 mt-28"
        width="300"
        height="300"
        alt={""}
      />
      <Image
        src="/slogan.svg"
        className="h-80 md:w-120"
        width="350"
        height="100"
        alt={""}
      />
    </section>
  )
}
