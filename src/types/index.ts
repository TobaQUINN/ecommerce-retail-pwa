export type Department = 'electronics' | 'fashion'

export type Availability = 'In Stock' | 'Limited Stock' | 'Out of Stock'

export type OrderStatus =
  | 'Pending Verification'
  | 'Ready for Payment'
  | 'Payment Submitted'
  | 'Payment Confirmed'
  | 'Processing'
  | 'Ready for Pickup'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'

export type PaymentStatus =
  | 'Pending'
  | 'Awaiting Verification'
  | 'Verified'
  | 'Rejected'

export type AdminRole = 'owner' | 'manager' | 'staff'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  department: Department
  categoryId: string
  price: number
  currency: string
  images: string[]
  availability: Availability
  stockQuantity: number
  featured: boolean
  newArrival: boolean
  bestSeller: boolean
  discountPercentage: number
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  department: Department
  icon: string
  image: string
  description: string
}

export interface Customer {
  id: string
  fullName: string
  phone: string
  email: string
  address: string
  state: string
  localGovernment: string
  createdAt: Date
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  deliveryMethod: 'delivery' | 'pickup'
  deliveryAddress: string
  notes: string
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  orderId: string
  amount: number
  paymentMethod: string
  transferReference: string
  paymentProof: string
  verificationStatus: PaymentStatus
  verifiedBy: string
  verifiedAt: Date | null
}

export interface Admin {
  id: string
  fullName: string
  email: string
  role: AdminRole
  permissions: string[]
  lastLogin: Date
}

export interface Notification {
  id: string
  type: string
  recipient: string
  title: string
  message: string
  read: boolean
  createdAt: Date
}
