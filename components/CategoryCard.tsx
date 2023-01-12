import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

export const CategoryCard: FC<Props> = ({ title, image, productCount }) => {
  return (
    <div className="category bg-primary px-4 text-white">
      <h3 className="my-4 text-left text-lg text-white">{title}</h3>
      <div
        className="w-fill h-250 relative bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(
            var(--transparent-primary),
            var(--transparent-primary)
          ), url("/asset3.png")`,
        }}
      >
        <Link
          href="/"
          className="text-neutral-100 absolute top-1/2 left-0 right-0 mx-auto text-center text-2xl uppercase"
        >
          Shop now
        </Link>
      </div>
      <p className="my-2 text-right text-white">{productCount} products</p>
    </div>
  )
}

interface Props {
  title?: string
  image?: string
  productCount?: number
}
