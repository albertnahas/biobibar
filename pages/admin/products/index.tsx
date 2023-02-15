import Link from "next/link"
import Image from "next/image"
import React, { useState, useEffect, useMemo, RefObject, useRef } from "react"
import { ReactSVG } from "react-svg"
import DeleteConfirmation from "../../../molecules/DeleteConfirmation"
import deleteProduct from "../../../helpers/product/deleteProduct"
import fetchProducts from "../../../helpers/products/fetchProducts"
import { Product } from "../../../types/product"
import Layout from "../../layout"
import { ProductsTable } from "../../../components/ProductsTable"
import fetchCategories from "../../../helpers/categories/fetchCategories"
import { Category } from "../../../types/category"
import { CloseButton } from "../../../atoms/CloseButton"
import addCategory from "../../../helpers/category/addCategory"
import withAuthentication from "../../../components/withAuth"
import { toast } from "react-toastify"
import Head from "next/head"
import Pagination from "../../../components/Pagination"
import EditImageBlock from "../../../atoms/EditImageBlock"
import { uploadImage } from "../../../helpers/UploadImage"
import deleteCategory from "../../../helpers/category/deleteCategory"
import { updateCategory } from "../../../helpers/category/updateCategory"

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [selectedItem, setSelectedItem] = useState<Product | Category>()
  const [showConfirm, setShowConfirm] = useState(false)

  const [pagination, setPagination] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const paginatedProducts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return products?.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, products])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const loadProducts = () => {
    fetchProducts().then((data) => setProducts(data))
    setPagination(true)
  }
  const loadCategories = () => {
    fetchCategories().then((data) => setCategories(data))
  }
  useEffect(() => {
    // fetchData()
    loadCategories()
  }, [])

  const onDeleteConfirm = () => {
    if (selectedItem && selectedItem.id) {
      if ("title" in selectedItem) {
        deleteProduct(selectedItem.id)
          .then(() => {
            loadProducts()
            setShowConfirm(false)
          })
          .catch((err: any) => {
            console.log(err)
            setShowConfirm(false)
            toast.error("Error deleting product")
          })
      } else if ("name" in selectedItem) {
        deleteCategory(selectedItem.id)
          .then(() => {
            loadCategories()
            setShowConfirm(false)
          })
          .catch((err: any) => {
            console.log(err)
            setShowConfirm(false)
            toast.error("Error deleting category")
          })
      }
    }
  }

  const onCancelDelete = () => {
    setShowConfirm(false)
  }

  const onClickEditCategory = (cat: CategoryItem) => {
    console.log(cat)

    setCategories(
      categories.map((c) => {
        if (c.id === cat.id) {
          return {
            ...c,
            edit: true,
          }
        }
        return c
      })
    )
  }

  const onClickSaveCategory = (cat: CategoryItem) => {
    setCategories(
      categories.map((c) => {
        if (c.id === cat.id) {
          return {
            ...c,
            edit: false,
          }
        }
        return c
      })
    )
    if (cat.id) {
      updateCategory(cat.id, { name: cat.name })
        .then(() => {
          loadCategories()
        })
        .catch((err: any) => {
          console.log(err)
          toast.error("Error updating category")
        })
    } else {
      addCategory(cat.name!, cat.image)
        .then(() => {
          loadCategories()
        })
        .catch((err: any) => {
          console.log(err)
          toast.error("Error adding category")
        })
    }
  }

  const handleOnChangeCategory = (e: any, cat: CategoryItem) => {
    setCategories(
      categories.map((c) => {
        if (c.id === cat.id) {
          return {
            ...c,
            name: e.target.value,
          }
        }
        return c
      })
    )
  }

  const onClickAddCategory = () => {
    setCategories([
      ...categories,
      {
        name: "",
        edit: true,
      },
    ])
  }

  const onClickDeleteCategory = (c: CategoryItem) => {
    setSelectedItem(c)
    setShowConfirm(true)
  }

  const imageRefs: React.RefObject<HTMLImageElement>[] = useMemo(
    () => categories.map((c) => React.createRef()),
    [categories]
  )

  const [imageLink, setImageLink] = useState<string>()
  const [isOpen, setIsOpen] = useState<
    RefObject<HTMLImageElement> | undefined | null
  >(null)

  const handleOpen = (ref?: RefObject<HTMLImageElement>): void => {
    setIsOpen(ref)
  }

  const handleUpload = async (
    ref?: RefObject<HTMLImageElement>,
    cat?: Category,
    e?: React.ChangeEvent
  ) => {
    const input = e?.target as HTMLInputElement

    if (!input.files?.length) {
      return
    }
    const file = input.files[0]

    // display the image
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageLink(e.target?.result as string)
      setIsOpen(null)

      if (ref?.current instanceof HTMLImageElement) {
        ref.current.style.opacity = "0.5"
      }
    }
    reader.readAsDataURL(file)

    let imageUrl: string
    try {
      imageUrl = await uploadImage(file)
      if (imageUrl) {
        const img = ref?.current
        if (cat && cat.id) {
          updateCategory(cat.id, { image: imageUrl })
            .then(() => {
              loadCategories()
            })
            .catch((err: any) => {
              console.log(err)
              toast.error("Error updating category")
            })
        } else if (cat) {
          setCategories(
            categories.map(c => {
              if (c === cat) {
                return {
                  ...c,
                  image: imageUrl
                };
              } else {
                return c;
              }
           })
          );
        }
        toast.success("Image uploaded successfully")
        img && setTimeout(() => (img.style.opacity = "1"), 1500)
      }
    } catch (e) {
      toast.error("Image size is too large")
      return
    }
  }

  const handleViewClick = (ref: any) => {
    if (ref?.current instanceof HTMLImageElement) {
      ref.current.click()
    }
  }

  const handleView = (e: any) => {
    const imageUrl = e.target.src
    if (!document.querySelector("div.img-lightbox")) {
      const lightbox = document.createElement("div")
      lightbox.classList.add("img-lightbox")

      const image = document.createElement("img")
      image.src = imageUrl
      lightbox.appendChild(image)

      const closeButton = document.createElement("button")
      closeButton.classList.add("close-lightbox-btn")
      closeButton.innerHTML = "X"
      lightbox.appendChild(closeButton)

      lightbox.addEventListener("click", (e: any) => {
        const els = document.querySelectorAll(".img-lightbox img")
        let isImg = false
        for (let i = 0; i < els.length; i++) {
          if (els[i] === e.target) isImg = true
        }
        if (!isImg) document.body.removeChild(lightbox)
        document.body.style.overflow = "auto"
      })

      closeButton.addEventListener("click", () => {
        document.body.removeChild(lightbox)
        document.body.style.overflow = "auto"
      })

      document.body.appendChild(lightbox)
      document.body.style.overflow = "hidden"
      setIsOpen(null)
    }
  }

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
        <div className="my-8 grid gap-4 md:grid-cols-2 lg:mb-16 lg:grid-cols-3 2xl:gap-4">
          {categories.map((c, i) => (
            <div className="relative grid gap-2 md:grid-cols-2" key={c.id}>
              <div className="col-1 h-180 cat-img-container relative">
                <Image
                  width="300"
                  height="100"
                  src={c.image || "/placeholder-image.jpg"}
                  className="cat-img"
                  style={{
                    objectFit: "cover",
                  }}
                  alt={c.name!}
                  ref={imageRefs[i]}
                  onClick={handleView}
                />
                <EditImageBlock
                  iconClass="cover-edit-icon small"
                  handleOpen={handleOpen.bind(this, imageRefs[i])}
                  handleViewClick={() => handleViewClick(imageRefs[i])}
                  handleUpload={handleUpload.bind(this, imageRefs[i], c)}
                  inputName={c.name!}
                  btnClass="cover-edit-btn"
                  open={isOpen}
                  svgClass="edit-svg h-3 w-3"
                />
              </div>
              <div
                className={`col-2 flex items-center justify-center [&:hover>.cat-tools]:visible ${
                  !c.edit && "[&>.cat-tools]:hidden"
                }`}
              >
                <textarea
                  autoFocus={c.edit}
                  className={`input ${
                    c.edit ? "input-primary" : ""
                  } w-full pr-14`}
                  value={c.name}
                  onChange={(e) => {
                    handleOnChangeCategory(e, c)
                  }}
                  readOnly={!c.edit}
                  rows={3}
                />
                <div className="cat-tools top-18 absolute right-0 2xl:right-4">
                  {!c.edit && (
                    <button onClick={onClickEditCategory.bind(null, c)}>
                      <ReactSVG
                        src="/edit2.svg"
                        className="mb-1 h-4 w-4 fill-gray-500 text-secondary"
                      />
                    </button>
                  )}
                  {c.edit && (
                    <button onClick={onClickSaveCategory.bind(null, c)}>
                      <ReactSVG
                        src="/check.svg"
                        className="mt-4 mr-4 h-4 w-4"
                      />
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
              setSelectedItem(product)
              setShowConfirm(true)
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

        {isOpen && (
          <div
            className="overlay"
            onClick={() => {
              setIsOpen(null)
            }}
          ></div>
        )}
      </Layout>
    </>
  )
}

interface CategoryItem extends Category {
  edit?: boolean
}

export default withAuthentication(ProductsAdmin)
