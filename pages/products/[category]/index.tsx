import React, { useMemo, useState } from "react";
import { ProductCard } from "../../../components/ProductCard";
import Layout from "../../layout";
import Breadcrumb from "../../../molecules/Breadcrumb";
import { Product } from "../../../types/product";
import fetchProducts from "../../../helpers/fetchProducts";
import fetchCategories from "../../../helpers/fetchCategories";
import Head from "next/head";
import Pagination from "../../../components/Pagination";

const Products = ({
  products,
  category,
}: {
  products?: Product[];
  category: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const paginatedProducts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return products?.slice(firstPageIndex, lastPageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const title = `Products - ${category || "All"} - BIOBIBAR`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Browse our selection of products." />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`https://www.biobibar.com/products/${category}`}
        />
      </Head>
      <Layout>
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Store", path: "/products/all" },
            { label: category, path: `/products/${category}` },
          ]}
        />
        <div className="container mt-12 px-0 md:px-24">
          {paginatedProducts?.map((product) => (
            <div className="mb-12 grid md:grid-cols-2" key={product.id}>
              <ProductCard
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                description={product.category}
              />
              <div className="pl-3">
                <p>{product.description}</p>
              </div>
            </div>
          ))}
          <Pagination
            items={products?.length || 0}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }: any) {
  const { category } = params
  // this is where you should fetch the product data from database or API
  const products = await fetchProducts(
    category && category !== "all" ? { category: category } : {}
  )
  return {
    props: {
      products,
      category,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  // this is where you should fetch all product ids from database or API
  const categories = await fetchCategories()
  const paths = categories
    .map((category) => `/products/${category.name}`)
    .concat("/products/all")

  return {
    paths,
    fallback: "blocking",
  }
}

export default Products
