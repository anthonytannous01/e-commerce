export interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  rating: number
}

export const products: Product[] = [
  {
    id: 1,
    name: 'T-Shirt',
    price: 19.99,
    category: 'Apparel',
    stock: 100,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Jeans',
    price: 49.99,
    category: 'Apparel',
    stock: 50,
    rating: 4.0,
  },
  {
    id: 3,
    name: 'Sneakers',
    price: 89.99,
    category: 'Footwear',
    stock: 75,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Watch',
    price: 199.99,
    category: 'Accessories',
    stock: 25,
    rating: 4.8,
  },
  {
    id: 5,
    name: 'Sunglasses',
    price: 99.99,
    category: 'Accessories',
    stock: 40,
    rating: 4.3,
  },
]
