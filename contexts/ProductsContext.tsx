import { createContext, Dispatch, FC, SetStateAction, useState } from "react"
import { Product } from "../types/product"

interface ProductContextValue {
  products: Product[]
  setProducts: Dispatch<SetStateAction<Product[]>>
}

const ProductContext = createContext<ProductContextValue>({
  products: [],
  setProducts: () => {},
})

const ProductProvider: FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

export { ProductContext, ProductProvider }

interface Props {
  children: React.ReactNode
}
