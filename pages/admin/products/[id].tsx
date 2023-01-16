import React, {
  useState,
  useEffect,
  ChangeEvent,
  MutableRefObject,
  LegacyRef,
} from "react"
import { Product } from "../../../types/product"
import fetchProduct from "../../../helpers/fetchProduct"
import { useForm, Controller } from "react-hook-form"
import Image from "next/image"
import { updateProduct } from "../../../helpers/updateProduct"
import addProduct from "../../../helpers/addProduct"
import { useRouter } from "next/router"
import Layout from "../../layout"
import fetchCategories from "../../../helpers/fetchCategories"
import { Category } from "../../../types/category"
import { uploadImage } from "../../../helpers/UploadImage"
import { ReactSVG } from "react-svg"
import { CloseButton } from "../../../atoms/CloseButton"
import withAuthentication from "../../../components/withAuth"

const Product = () => {
  const [product, setProduct] = useState<Product>({ title: "" })
  const [images, setImages] = useState<File[] | null>([])
  const [imagesLinks, setImagesLinks] = useState<string[]>()
  const [newImage, setNewImage] = useState<File | null>(null)
  const [newImageLink, setNewImageLink] = useState<string>()
  const [categories, setCategories] = useState<Category[]>([])

  const [submitting, setSubmitting] = useState(false)

  const { id } = useRouter().query
  const isNew = id && id !== "new"

  useEffect(() => {
    if (isNew) {
      fetchProduct(id as string).then((res) => {
        setProduct({ id, ...res })
      })
    } else {
      setProduct({
        title: "",
        description: "",
        text: "",
        category: "",
        image: "",
        images: [],
        isFeatured: true,
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    // reset form with product data
    reset(product)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const {
    control,
    setError,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Product>()
  const router = useRouter()
  const hiddenFileInput = React.useRef<any>(null)
  const handleEditImageClick = () => {
    if (hiddenFileInput?.current instanceof HTMLInputElement) {
      hiddenFileInput.current.click()
    }
  }
  const handleImageChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement

    if (!input.files?.length) {
      return
    }
    const file = input.files[0]

    // display the image
    const reader = new FileReader()
    reader.onload = (e) => {
      setNewImageLink(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    setNewImage(file)
  }

  const onSubmit = async (data: Product) => {
    setSubmitting(true)
    let imageUrl
    let imagesUrl: string[] = []
    if (newImage) {
      // upload new image to firebase storage
      try {
        imageUrl = await uploadImage(newImage)
      } catch (e) {
        setError("image", {
          type: "server",
          message: "Image size is too large",
        })
        setSubmitting(false)
        return
      }
    }
    if (images?.length) {
      // upload new images to firebase storage
      try {
        imagesUrl = await Promise.all(images.map((image) => uploadImage(image)))
      } catch (e) {
        setError("images", {
          type: "server",
          message: "Image size is too large",
        })
        setSubmitting(false)
        return
      }
    }
    // update product in firebase realtime database
    const updatedProduct: Product = {
      ...(product || {}),
      ...(data || { title: "new" }),
      ...((isNew && { id: id as string }) || {}),
    }
    updatedProduct.images = [...(data?.images || []), ...imagesUrl]
    if (imageUrl) {
      updatedProduct.image = imageUrl
    }
    let res
    if (isNew) {
      res = updateProduct(id as string, updatedProduct)
    } else {
      // create new product
      res = addProduct(updatedProduct)
    }
    res
      .then((response) => {
        // redirect to product list
        router.push("/admin/products")
      })
      .catch((e) => {
        setError("title", {
          type: "server",
          message: "Something went wrong please try again later",
        })
        setSubmitting(false)
      })
  }

  // useEffect when images change set imagesLinks
  useEffect(() => {
    console.log("images", images)

    setImagesLinks([])
    if (images?.length) {
      images.forEach((image) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagesLinks((il) => [...(il || []), e.target?.result as string])
        }
        reader.readAsDataURL(image)
      })
    }
  }, [images])

  const onClickAddNewImg = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.onchange = (e) => {
      const input = e.target as HTMLInputElement
      if (!input.files?.length) {
        return
      }
      const file = input.files[0]
      setImages([...(images || []), file])
    }
    input.click()
  }

  const onClickDeleteProductImage = (url: string) => {
    setProduct((p) => {
      const newProduct = { ...p }
      newProduct.images = newProduct?.images?.filter((image) => image !== url)
      return newProduct
    })
  }

  const onClickDeleteNewImage = (index: number) => {
    setImages((images) => {
      const newImages = [...(images || [])]
      newImages.splice(index, 1)
      return newImages
    })
  }

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res)
    })
  }, [])

  if (!product) return <div>Loading...</div>
  return (
    <Layout isAdmin>
      <div className="container my-12">
        <h1 className="mb-8 text-3xl">{isNew ? "Edit" : "Add"} Product</h1>

        <div className="grid md:grid-cols-2">
          <div>
            <div className="mb-4">
              <Image
                width="400"
                height="300"
                src={newImageLink || product.image || "/asset3.png"}
                alt={product.title}
              />
            </div>
            <div>
              <label htmlFor="image">
                <button
                  onClick={handleEditImageClick}
                  className="btn-primary-sm"
                >
                  Edit Image
                </button>
              </label>
              <input
                name="image"
                ref={hiddenFileInput}
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {[...(product.images || [])]?.map((image) => (
                  <div key={image} className="relative h-full w-full">
                    <Image
                      width="400"
                      height="300"
                      alt={product.title}
                      src={image}
                    />
                    <div className="absolute right-2 top-2">
                      <CloseButton
                        onClick={() => onClickDeleteProductImage(image)}
                      />
                    </div>
                  </div>
                ))}
                {[...(imagesLinks || [])]?.map((image, index) => (
                  <div key={image} className="relative h-full w-full">
                    <Image
                      width="400"
                      height="300"
                      alt={product.title}
                      src={image}
                    />
                    <div className="absolute right-2 top-2">
                      <CloseButton
                        onClick={() => onClickDeleteNewImage(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={onClickAddNewImg}>
              <ReactSVG src="/plus.svg" className="m-2 h-12 w-12" />
            </button>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <table className="w-full [&_td]:pb-3">
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="title">Name</label>
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name="title"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            className="input input-primary"
                            placeholder="Title"
                            {...field}
                          />
                        )}
                      />
                      {errors.title && <span>Title is required</span>}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="category">Category</label>
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name="category"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <select
                            className="input input-primary h-10"
                            {...field}
                          >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                              <option key={category.name} value={category.name}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.category && <span>Category is required</span>}
                    </td>
                  </tr>
                  {/* new tr for description textarea */}
                  <tr>
                    <td>
                      <label htmlFor="description">Description</label>
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name="description"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <textarea
                            className="input input-primary"
                            rows={3}
                            placeholder="Description"
                            {...field}
                          />
                        )}
                      />
                      {errors.description && (
                        <span>Description is required</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="price">Price</label>
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name="price"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            className="input input-primary"
                            placeholder="Price"
                            type={"number"}
                            min={0}
                            max={100000}
                            step={1}
                            {...field}
                          />
                        )}
                      />
                      {errors.price && <span>Price is required</span>}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="mr-4" htmlFor="isFeatured">
                        Featured product
                      </label>
                      <Controller
                        control={control}
                        name="isFeatured"
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded-full text-secondary shadow focus:ring-secondary"
                            name="isFeatured"
                            checked={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.checked)
                            }}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <label className="mr-4" htmlFor="isNew">
                        New product
                      </label>
                      <Controller
                        control={control}
                        name="isNew"
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded-full text-secondary shadow focus:ring-secondary"
                            name="isNew"
                            checked={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.checked)
                            }}
                          />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <button
                        disabled={submitting}
                        className="btn-secondary mt-8 w-52 disabled:bg-gray-400"
                        type="submit"
                      >
                        Save
                      </button>
                      {submitting && <p>saving....</p>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default withAuthentication(Product)
