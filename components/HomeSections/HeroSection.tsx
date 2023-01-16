import Image from "next/image"

export const HeroSection = ({
  coverUrl,
  slogan,
}: {
  coverUrl?: string
  slogan?: string
}) => {
  return (
    <section
      style={{
        backgroundImage: `url('/bg.png'),url(${coverUrl || "./asset1.png"})`,
      }}
      className={`hero-bg absolute-top h-screen-2 flex flex-col items-center justify-center`}
    >
      <Image
        src="/logo.png"
        className="md:h-80 md:w-80"
        width="300"
        height="300"
        alt={""}
      />
      {/* <Image
        src="/slogan.svg"
        className="md:w-120 h-80"
        width="350"
        height="100"
        alt={""}
      /> */}
      <h1 dir="rtl" className="mt-32 font-arabic text-6xl text-primary-light">
        {slogan || "من عبق حلب بدأنا..."}
      </h1>
    </section>
  )
}
