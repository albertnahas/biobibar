import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"
import { productLink } from "../helpers/utils"
import { Product } from "../types/product"

export const ProductCard: FC<Props> = (product) => {
  const { title, description, price } = product
  const route = useRouter()

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        route.push(productLink(product))
      }}
    >
      <Image
        src={product.image || "/box.png"}
        alt="product"
        className="product-image border-4 border-primary md:border-8"
        style={{
          objectFit: "cover",
        }}
        width="300"
        height="300"
      />
      <Link href={productLink(product)}>
        <h3 className="mt-2 text-2xl">{title}</h3>
        <div className="flex justify-between">
          <p className="text-md">{description}</p>
          <p className="text-md">{price}$</p>
        </div>
      </Link>
    </div>
  )
}

interface Props extends Product {}
