import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import type { User } from 'firebase/auth'

export async function isUserAdmin(user: User): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'admins'),
      where('email', '==', user.email)
    )
    const snapshot = await getDocs(q)
    if (!snapshot.empty) return true
  } catch {
    // Fall through to email check
  }
  // Fallback: allow known admin email
  return user.email === 'daraalimi78@gmail.com'
}
