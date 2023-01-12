import Image from "next/image"
import { FC } from "react"

export const ProductCard: FC<Props> = ({
  title,
  description,
  image,
  price,
}) => {
  return (
    <a href="#" className="product">
      <Image
        src="/box.png"
        alt="product"
        className="product-image rounded-lg border-4 md:border-8 border-primary"
        style={{
          objectFit: "cover",
        }}
        width="300"
        height="300"
      />
      <h3 className="mt-2 text-2xl">{title}</h3>
      <div className="flex justify-between">
        <p className="text-md">{description}</p>
        <p className="text-md">{price}$</p>
      </div>
    </a>
  )
}

interface Props {
  title?: string
  description?: string
  image?: string
  price?: number
}
