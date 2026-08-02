import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import type { OrderStatus, PaymentStatus } from '@/types'

export interface AdminOrder {
  id: string
  orderNumber: string
  customerId: string
  items: any[]
  subtotal: number
  deliveryFee: number
  total: number
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  deliveryMethod: string
  deliveryAddress: string
  notes: string
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getAllOrders(): Promise<AdminOrder[]> {
  const snapshot = await getDocs(collection(db, 'orders'))
  return snapshot.docs
    .map((d) => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate() ?? null,
      updatedAt: d.data().updatedAt?.toDate() ?? null,
    } as AdminOrder))
    .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0))
}

export function subscribeToAllOrders(callback: (orders: AdminOrder[]) => void): Unsubscribe {
  return onSnapshot(
    collection(db, 'orders'),
    (snapshot) => {
      const orders = snapshot.docs
        .map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toDate() ?? null,
          updatedAt: d.data().updatedAt?.toDate() ?? null,
        } as AdminOrder))
        .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0))
      callback(orders)
    },
    (error) => {
      console.error('Orders listener error:', error)
      callback([])
    }
  )
}

export async function updateOrderStatus(orderId: string, orderStatus: OrderStatus) {
  await updateDoc(doc(db, 'orders', orderId), {
    orderStatus,
    updatedAt: serverTimestamp(),
  })
}

export async function updateDeliveryFee(orderId: string, deliveryFee: number) {
  await updateDoc(doc(db, 'orders', orderId), {
    deliveryFee,
    total: deliveryFee, // will be recalculated with subtotal on read
    updatedAt: serverTimestamp(),
  })
}

export async function getAllCustomers() {
  const snapshot = await getDocs(collection(db, 'customers'))
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate() ?? null,
  }))
}
