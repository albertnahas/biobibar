import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

export const ProductCard: FC<Props> = ({
  id,
  title,
  description,
  image,
  price,
}) => {
  return (
    <Link href={`/products?id=${id}`} as={`/products/${id}`}>
      <Image
        src="/box.png"
        alt="product"
        className="product-image border-4 border-primary md:border-8"
        style={{
          objectFit: "cover",
        }}
        width="300"
        height="300"
      />
      <h3 className="mt-2 text-2xl">{title}</h3>
      <div className="w-300 flex justify-between">
        <p className="text-md">{description}</p>
        <p className="text-md">{price}$</p>
      </div>
    </Link>
  )
}

interface Props {
  id?: string
  title?: string
  description?: string
  image?: string
  price?: number
}
