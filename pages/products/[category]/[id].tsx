import React, { useCallback, useState } from "react"
import Image from "next/image"
import Breadcrumb from "../../../molecules/Breadcrumb"
import Layout from "../../layout"
import { ProductCard } from "../../../components/ProductCard"
import { Product } from "../../../types/product"
import fetchProducts from "../../../helpers/products/fetchProducts"
import { ContactForm } from "../../../components/ContactForm"
import fetchProduct from "../../../helpers/product/fetchProduct"
import { productLink } from "../../../helpers/utils"
import Head from "next/head"
import ImageViewer from "react-simple-image-viewer"

interface SingleProductProps {
  product: Product
  products: Product[]
}

const SingleProduct: React.FC<SingleProductProps> = ({ product, products }) => {
  const { id, title, category, image, text, images, description, price } =
    product
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }
  const pageTitle = `${product.title || ""} - BIOBIBAR`
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta
          property="og:url"
          content={`https://biobibar.com/product/${product.id}`}
        />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={`${product.price}`} />
        <meta property="product:price:currency" content="USD" />
        <link
          rel="canonical"
          href={`https://biobibar.com/product/${product.id}`}
        />
      </Head>
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Store", path: "/products/all" },
          { label: category || "", path: `/products/${category || "all"}` },
          { label: title, path: productLink(product) },
        ]}
      />
      <div className="mt-12 grid gap-20 md:grid-cols-2">
        <div className="">
          <Image
            width="600"
            height="600"
            className="max-h-96 w-full cursor-pointer object-cover"
            src={image || "/box.png"}
            alt={title}
            onClick={() => openImageViewer(0)}
          />
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {images?.map((img, index) => (
              <Image
                className="w-full cursor-pointer object-cover"
                style={{
                  objectFit: "cover",
                }}
                key={img}
                src={img}
                alt={title}
                width="200"
                height="200"
                onClick={() => openImageViewer(index + 1)}
              />
            ))}
          </div>
        </div>
        <div className="">
          <h2 className="text-2xl font-medium text-secondary-dark">{title}</h2>
          <p className="text-secondary-dark">{category}</p>
          <hr className="my-2  text-secondary-dark" />
          <p className="text-secondary-dark">{description}</p>
          <p className="text-secondary-dark">{text}</p>
          <hr className="my-2  text-secondary-dark" />
          <p className="text-2xl font-medium text-secondary-dark">{price}$</p>
          <hr className="my-2  text-secondary-dark" />
        </div>
      </div>
      <div className="mt-16">
        <ContactForm
          redirect={`/products/${product.category}`}
          source={`product ${product.category}/${product.title}`}
        />
      </div>
      <div className="container">
        <div className="my-20 grid gap-12 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.category}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
      </div>
      <hr className="mx-60" />
      {isViewerOpen && (
        <ImageViewer
          src={(image ? [image] : []).concat([...(images || [])])}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )}
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
