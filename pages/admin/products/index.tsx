import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { ReactSVG } from "react-svg";
import DeleteConfirmation from "../../../molecules/DeleteConfirmation";
import deleteProduct from "../../../helpers/deleteProduct";
import fetchProducts from "../../../helpers/fetchProducts";
import { Product } from "../../../types/product";
import Layout from "../../layout";
import { ProductsTable } from "../../../components/ProductsTable";
import fetchCategories from "../../../helpers/fetchCategories";
import { Category } from "../../../types/category";
import deleteCategory from "../../../helpers/deleteCategory";
import { CloseButton } from "../../../atoms/CloseButton";
import addCategory from "../../../helpers/addCategory";
import { updateCategory } from "../../../helpers/updateCategory";
import withAuthentication from "../../../components/withAuth";
import { toast } from "react-toastify";
import Head from "next/head";
import Pagination from "../../../components/Pagination";

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<Product | Category>();
  const [showConfirm, setShowConfirm] = useState(false);

  const [pagination, setPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const paginatedProducts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return products?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const loadProducts = () => {
    fetchProducts().then((data) => setProducts(data));
    setPagination(true);
  };
  const loadCategories = () => {
    fetchCategories().then((data) => setCategories(data));
  };
  useEffect(() => {
    // fetchData()
    loadCategories();
  }, []);

  const onDeleteConfirm = () => {
    if (selectedItem && selectedItem.id) {
      if ("title" in selectedItem) {
        deleteProduct(selectedItem.id)
          .then(() => {
            loadProducts();
            setShowConfirm(false);
          })
          .catch((err: any) => {
            console.log(err);
            setShowConfirm(false);
            toast.error("Error deleting product");
          });
      } else if ("name" in selectedItem) {
        deleteCategory(selectedItem.id)
          .then(() => {
            loadCategories();
            setShowConfirm(false);
          })
          .catch((err: any) => {
            console.log(err);
            setShowConfirm(false);
            toast.error("Error deleting category");
          });
      }
    }
  };

  const onCancelDelete = () => {
    setShowConfirm(false);
  };

  const onClickEditCategory = (cat: CategoryItem) => {
    console.log(cat);

    setCategories(
      categories.map((c) => {
        if (c.id === cat.id) {
          return {
            ...c,
            edit: true,
          };
        }
        return c;
      })
    );
  };

  const onClickSaveCategory = (cat: CategoryItem) => {
    setCategories(
      categories.map((c) => {
        if (c.id === cat.id) {
          return {
            ...c,
            edit: false,
          };
        }
        return c;
      })
    );
    if (cat.id) {
      updateCategory(cat.id, cat.name)
        .then(() => {
          loadCategories();
        })
        .catch((err: any) => {
          console.log(err);
          toast.error("Error updating category");
        });
    } else {
      addCategory(cat.name)
        .then(() => {
          loadCategories();
        })
        .catch((err: any) => {
          console.log(err);
          toast.error("Error adding category");
        });
    }
  };

  const handleOnChangeCategory = (e: any, cat: CategoryItem) => {
    setCategories(
      categories.map((c) => {
        if (c.id === cat.id) {
          return {
            ...c,
            name: e.target.value,
          };
        }
        return c;
      })
    );
  };

  const onClickAddCategory = () => {
    setCategories([
      ...categories,
      {
        name: "",
        edit: true,
      },
    ]);
  };

  const onClickDeleteCategory = (c: CategoryItem) => {
    setSelectedItem(c);
    setShowConfirm(true);
  };

  return (
    <>
      <Head>
        <title>Products - BIOBIBAR Admin</title>
        <meta name="description" content="Add, edit or remove products." />
        <link
          rel="canonical"
          href={"https://www.biobibar.com/admin/products/"}
        />
      </Head>
      <Layout isAdmin>
        <h1 className="text-dark flex items-center text-3xl font-bold text-primary">
          Categories
          <button className="ml-4" onClick={onClickAddCategory}>
            <ReactSVG src="/plus.svg" className="inline-block h-8 w-8" />
          </button>
        </h1>
        <div className="my-8 flex flex-wrap gap-8">
          {categories.map((c) => (
            <div
              className={`relative [&:hover>.cat-tools]:visible ${
                !c.edit && "[&>.cat-tools]:hidden"
              }`}
              key={c.id}
            >
              <input
                type="text"
                autoFocus={c.edit}
                className={`input ${c.edit ? "input-primary" : ""} w-44 pr-16`}
                value={c.name}
                onChange={(e) => {
                  handleOnChangeCategory(e, c);
                }}
                readOnly={!c.edit}
              />
              <div className="cat-tools absolute top-0 right-0">
                {!c.edit && (
                  <button onClick={onClickEditCategory.bind(null, c)}>
                    <ReactSVG
                      src="/edit2.svg"
                      className="text-seconday mb-1 h-4 w-4 fill-gray-500"
                    />
                  </button>
                )}
                {c.edit && (
                  <button onClick={onClickSaveCategory.bind(null, c)}>
                    <ReactSVG src="/check.svg" className="mt-4 mr-4 h-4 w-4" />
                  </button>
                )}
                {!c.edit && (
                  <CloseButton
                    transparent={true}
                    onClick={onClickDeleteCategory.bind(null, c)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-dark flex items-center text-3xl font-bold text-primary">
          Products
          <Link className="ml-4" href="/admin/products/new">
            <ReactSVG src="/plus.svg" className="inline-block h-8 w-8" />
          </Link>
        </h1>
        <div className=" min-h-300">
          <ProductsTable
            products={paginatedProducts}
            onDelete={(product: Product) => {
              setSelectedItem(product);
              setShowConfirm(true);
            }}
          />

          {!products.length && (
            <div className="flex justify-center">
              <button
                className="btn-primary-sm m-8 text-xl font-bold"
                onClick={loadProducts}
              >
                View Products
              </button>
            </div>
          )}

          {pagination && (
            <Pagination
              items={products?.length || 0}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          )}
        </div>

        {showConfirm && (
          <DeleteConfirmation
            onCancel={onCancelDelete}
            onConfirm={onDeleteConfirm}
          />
        )}
      </Layout>
    </>
  );
};

interface CategoryItem extends Category {
  edit?: boolean;
}

export default withAuthentication(ProductsAdmin);
