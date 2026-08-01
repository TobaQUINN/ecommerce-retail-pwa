export const BUSINESS_NAME = 'De Excelsior Store'

export const DEPARTMENTS = ['electronics', 'fashion'] as const

export const AVAILABILITY_OPTIONS = [
  'In Stock',
  'Limited Stock',
  'Out of Stock',
] as const

export const ORDER_STATUSES = [
  'Pending Verification',
  'Ready for Payment',
  'Payment Submitted',
  'Payment Confirmed',
  'Processing',
  'Ready for Pickup',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
] as const

export const PAYMENT_STATUSES = [
  'Pending',
  'Awaiting Verification',
  'Verified',
  'Rejected',
] as const

export const CURRENCY = 'NGN'
