import Link from "next/link"
import { FC } from "react"
import { ReactSVG } from "react-svg"

export const CircleSection = () => {
  return (
    <section
      className="bg-cover bg-top bg-no-repeat bg-blend-multiply"
      style={{ backgroundImage: `url("/bg.png"), url("/asset2.png")` }}
    >
      <div className="h-200 container mx-auto">
        <div className="relative z-20 flex h-full items-center justify-center gap-4 md:bottom-1/3 md:gap-6">
          <ReactSVG src="/arrows.svg" className="h-7 w-7" />
          <Circle href="/products" />
          <Circle href="/products" />
          <Circle href="/products" />
          <ReactSVG src="/arrows.svg" className="h-7 w-7 -scale-x-100" />
        </div>
      </div>
    </section>
  )
}

// Circle function
const Circle: FC<CircleProps> = ({ children, className, href }) => {
  return (
    <Link href={href || ""}>
      <div
        className={`circle md:w-180 md:h-180 bg-primary-light h-20 w-20 rounded-full border-4 md:border-8 ${className}`}
      >
        {children}
      </div>
      <p className="text-primary text-xl md:text-3xl pl-4 mt-4">BioBibar</p>
      <p className="text-primary pl-4">BioBibar</p>
    </Link>
  )
}

interface CircleProps {
  href?: string
  className?: string
  children?: React.ReactNode
}
