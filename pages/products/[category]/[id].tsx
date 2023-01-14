import React from "react"
import Image from "next/image"
import Breadcrumb from "../../../components/Breadcrumb"
import Layout from "../../layout"
import { ProductCard } from "../../../components/ProductCard"
import { Product } from "../../../types/product"
import fetchProducts from "../../../helpers/fetchProducts"
import { ContactForm } from "../../../components/ContactForm"
import fetchProduct from "../../../helpers/fetchProduct"
import { productLink } from "../../../helpers/utils"

interface SingleProductProps {
  product: Product
  products: Product[]
}

const SingleProduct: React.FC<SingleProductProps> = ({ product, products }) => {
  const { id, title, category, image, images, description, price } = product
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Store", path: "/products" },
          { label: category || "", path: `/products/${category || "all"}` },
          { label: title, path: productLink(product) },
        ]}
      />
      <div className="mt-12 grid gap-20 md:grid-cols-2">
        <div className="">
          <Image
            width="600"
            height="600"
            className="max-h-96 w-full object-cover"
            //   src={image}
            src={"/asset3.png"}
            alt={title}
          />
          <div className="mt-4 flex flex-wrap">
            {images?.map((img) => (
              <Image
                className="h-24 w-1/4 object-cover"
                key={img}
                src={img}
                alt={title}
                width="200"
                height="200"
              />
            ))}
          </div>
        </div>
        <div className="">
          <h2 className="text-2xl font-medium text-secondary-dark">{title}</h2>
          <p className="text-secondary-dark">{category}</p>
          <hr className="my-2  text-secondary-dark" />
          <p className="text-secondary-dark">{description}</p>
          <hr className="my-2  text-secondary-dark" />
          <p className="text-2xl font-medium text-secondary-dark">{price}$</p>
          <hr className="my-2  text-secondary-dark" />
        </div>
      </div>
      <div className="mt-16">
        <ContactForm source={`product ${product.category}/${product.title}`} />
      </div>
      <div className="container">
        <div className="my-20 grid gap-12 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
      </div>
      <hr className="mx-60" />
    </>
  )
}

const ProductPage = ({ product, products }: SingleProductProps) => {
  if (!product) {
    return {
      notFound: true,
    }
  }
  return (
    <Layout>
      <SingleProduct product={product} products={products} />
    </Layout>
  )
}

export async function getStaticProps({ params }: any) {
  const { id } = params
  // this is where you should fetch the product data from database or API
  const product = await fetchProduct(id)
  const products = await fetchProducts({ category: product.category })

  return {
    props: {
      product,
      products,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  // this is where you should fetch all product ids from database or API
  const products = await fetchProducts()
  const paths = products.map((product) => productLink(product))

  return {
    paths,
    fallback: "blocking",
  }
}

export default ProductPage
