import Image from "next/image"
import { ReactSVG } from "react-svg"

export const AboutSection = () => {
  return (
    <section className="ornament-bg min-h-500 z-10 relative bg-white bg-no-repeat py-24 shadow-2xl shadow-text">
      <div className="mx-auto flex w-4/5 flex-col md:w-2/3 md:flex-row md:items-center md:justify-center md:px-12 lg:max-w-7xl">
        <div className="flex flex-col items-center justify-center md:w-2/3">
          <p className="text-center text-xl text-text md:text-left">
            هي شركة سورية مقرها مدينة حلب متخصصة في مجال صناعة الصابون الغار
            الحلبي العريق رائدة في مجالها تحمل معها أكثر من 20 عاما من الخبرة في
            مجال صناعة الصابون وتعمل الشركة على تطوير منتجاتها بشكل دائم ورفع
            السوية الإنتاجية مما يتلائم مع التطورات التكنولوجية مع الحفاظ على
            تراث هذه الصناعة
          </p>
        </div>
        {/* <div className="flex flex-col items-center justify-center md:w-1/3"></div> */}
        <ReactSVG
          src="/separator.svg"
          className="mx-12 hidden h-32 w-5 md:block"
        />
        <Image
          src="/logo-dark.png"
          className="md:h-52 md:w-52"
          width="300"
          height="300"
          alt={""}
        />
      </div>
    </section>
  )
}
