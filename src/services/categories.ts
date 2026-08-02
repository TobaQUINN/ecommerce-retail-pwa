import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import type { Department } from '@/types'

export interface CategoryDocument {
  id: string
  name: string
  slug: string
  department: Department
  icon: string
  image: string
  description: string
}

export async function getAllCategories(): Promise<CategoryDocument[]> {
  const snapshot = await getDocs(collection(db, 'categories'))
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as CategoryDocument[]
}

export async function getCategoriesByDepartment(department: string): Promise<CategoryDocument[]> {
  const q = query(
    collection(db, 'categories'),
    where('department', '==', department)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as CategoryDocument[]
}
