import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'
import { db, auth } from '@/firebase/config'
import type { OrderItem } from '@/types'

export interface CreateOrderData {
  customer: {
    fullName: string
    phone: string
    email: string
    state: string
    city: string
    address: string
  }
  items: OrderItem[]
  subtotal: number
  notes: string
}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `DEX-${timestamp}-${random}`
}

export async function createOrder(data: CreateOrderData) {
  const orderNumber = generateOrderNumber()

  const uid = auth.currentUser?.uid

  const customerRef = await addDoc(collection(db, 'customers'), {
    uid,
    fullName: data.customer.fullName,
    phone: data.customer.phone,
    email: data.customer.email,
    address: data.customer.address,
    state: data.customer.state,
    localGovernment: data.customer.city,
    createdAt: serverTimestamp(),
  })

  const orderRef = await addDoc(collection(db, 'orders'), {
    orderNumber,
    customerId: uid,
    items: data.items,
    subtotal: data.subtotal,
    deliveryFee: 0,
    total: data.subtotal,
    paymentStatus: 'Pending',
    orderStatus: 'Pending Verification',
    deliveryMethod: 'delivery',
    deliveryAddress: `${data.customer.address}, ${data.customer.city}, ${data.customer.state}`,
    notes: data.notes,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return { orderId: orderRef.id, orderNumber }
}

export async function getOrder(orderId: string) {
  const orderDoc = await getDoc(doc(db, 'orders', orderId))
  if (!orderDoc.exists()) return null
  return { id: orderDoc.id, ...orderDoc.data() }
}

export async function getUserOrders(uid: string) {
  const q = query(
    collection(db, 'orders'),
    where('customerId', '==', uid)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs
    .map((d) => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate() ?? null,
      updatedAt: d.data().updatedAt?.toDate() ?? null,
    }))
    .sort((a: any, b: any) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0))
}

export function subscribeToOrder(
  orderId: string,
  callback: (order: any) => void
): Unsubscribe {
  return onSnapshot(doc(db, 'orders', orderId), (snapshot) => {
    if (snapshot.exists()) {
      callback({
        id: snapshot.id,
        ...snapshot.data(),
        createdAt: snapshot.data().createdAt?.toDate() ?? null,
        updatedAt: snapshot.data().updatedAt?.toDate() ?? null,
      })
    }
  })
}

export async function getCustomer(customerId: string) {
  const customerDoc = await getDoc(doc(db, 'customers', customerId))
  if (!customerDoc.exists()) return null
  return { id: customerDoc.id, ...customerDoc.data() }
}
