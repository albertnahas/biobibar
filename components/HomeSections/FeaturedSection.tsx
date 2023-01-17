import Link from "next/link"
import { FC } from "react"
import { ReactSVG } from "react-svg"
import Slider from "react-slick"
import { Product } from "../../types/product"
import { productLink } from "../../helpers/utils"

export const FeaturedSection: FC<Props> = ({ products, coverUrl }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <ReactSVG src="/arrows2.svg" />,
    prevArrow: <ReactSVG src="/arrows.svg" />,
  }

  return (
    <section
      className="bg-cover bg-top bg-no-repeat bg-blend-multiply"
      style={{
        backgroundImage: `url("/bg.png"), url(${coverUrl || "./asset2.png"})`,
      }}
    >
      <div className="h-200 container mx-auto">
        <div className="w-250 md:w-600 relative z-20 m-auto -translate-y-1/3">
          <div>
            <Slider {...settings}>
              {products?.map((product) => (
                <Circle
                  key={product.id}
                  product={product}
                  href={productLink(product)}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
}

// Circle function
const Circle: FC<CircleProps> = ({ children, className, product, href }) => {
  return (
    <Link href={href || ""}>
      <div
        className={`circle md:w-180 md:h-180 bg-primary-light m-auto h-20 w-20 rounded-full border-4 md:border-8 ${className}`}
      >
        {children}
      </div>
      <p className="mt-4 pl-4 text-xl text-primary md:text-3xl">
        {product?.title}
      </p>
      <p className="pl-4 text-primary">{product?.category}</p>
    </Link>
  )
}

interface CircleProps {
  href?: string
  className?: string
  product?: Product
  children?: React.ReactNode
}

interface Props {
  products?: Product[]
  coverUrl?: string
}
