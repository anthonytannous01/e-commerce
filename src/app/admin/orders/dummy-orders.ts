export interface Order {
  id: number
  productName: string
  customerName: string
  quantity: number
  totalPrice: number
  status: string
  date: string
}

export const orders: Order[] = [
  {
    id: 1,
    productName: 'T-Shirt',
    customerName: 'John Doe',
    quantity: 2,
    totalPrice: 39.98,
    status: 'Shipped',
    date: '2024-08-10',
  },
  {
    id: 2,
    productName: 'Sneakers',
    customerName: 'Jane Smith',
    quantity: 1,
    totalPrice: 89.99,
    status: 'Processing',
    date: '2024-08-12',
  },
  {
    id: 3,
    productName: 'Watch',
    customerName: 'Alice Johnson',
    quantity: 1,
    totalPrice: 199.99,
    status: 'Delivered',
    date: '2024-08-14',
  },
  {
    id: 4,
    productName: 'Jeans',
    customerName: 'Bob Brown',
    quantity: 3,
    totalPrice: 149.97,
    status: 'Cancelled',
    date: '2024-08-15',
  },
  {
    id: 5,
    productName: 'Sunglasses',
    customerName: 'Charlie White',
    quantity: 1,
    totalPrice: 99.99,
    status: 'Shipped',
    date: '2024-08-16',
  },
]
