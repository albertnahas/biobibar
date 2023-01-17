import Image from "next/image"
import { ReactSVG } from "react-svg"

export const AboutSection = ({ about }: { about?: string }) => {
  return (
    <section className="ornament-bg min-h-500 relative z-10 bg-white bg-no-repeat py-24 shadow-2xl shadow-text">
      <AboutInfo about={about} />
    </section>
  )
}

export const AboutInfo = ({ about }: { about?: string }) => (
  <div className="mx-auto flex w-4/5 flex-col md:w-2/3 md:flex-row md:items-center md:justify-center md:px-12 lg:max-w-7xl">
    <div className="flex flex-col items-center justify-center md:w-2/3">
      <p className="text-center font-arabic text-2xl text-text md:text-right">
        {about}
      </p>
    </div>
    {/* <div className="flex flex-col items-center justify-center md:w-1/3"></div> */}
    <ReactSVG src="/separator.svg" className="mx-12 hidden h-32 w-5 md:block" />
    <Image
      src="/logo-dark.png"
      className="md:h-52 md:w-52"
      width="300"
      height="300"
      alt={"BioBibar logo"}
    />
  </div>
)
