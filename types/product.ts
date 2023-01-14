export interface Product {
    id?: string
    title: string
    category?: string
    image?: string
    images?: string[]
    description?: string
    text?: string
    price?: number
    isFeatured?: boolean
    isNew?: boolean
    dateAdded?: Date
}