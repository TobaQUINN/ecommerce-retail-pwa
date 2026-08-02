import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '@/firebase/config'

export interface Message {
  id: string
  orderId: string
  senderId: string
  senderName: string
  senderRole: 'customer' | 'staff'
  text: string
  createdAt: Date | null
}

export async function sendMessage(
  orderId: string,
  senderId: string,
  senderName: string,
  senderRole: 'customer' | 'staff',
  text: string
) {
  await addDoc(collection(db, 'orders', orderId, 'messages'), {
    orderId,
    senderId,
    senderName,
    senderRole,
    text,
    createdAt: serverTimestamp(),
  })
}

export function subscribeToMessages(
  orderId: string,
  callback: (messages: Message[]) => void
): Unsubscribe {
  const q = query(
    collection(db, 'orders', orderId, 'messages'),
    orderBy('createdAt', 'asc')
  )

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() ?? null,
    })) as Message[]
    callback(messages)
  })
}
