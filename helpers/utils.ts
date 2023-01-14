import { Product } from "../types/product";

export const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) =>
    obj[key];


export const productLink = (product: Product) => `/products/${product.category || 'all'}/${product.id}`