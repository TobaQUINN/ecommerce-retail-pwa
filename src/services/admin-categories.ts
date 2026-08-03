import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import type { Department } from '@/types'

export interface CategoryFormData {
  name: string
  department: Department
  description: string
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function createCategory(data: CategoryFormData): Promise<string> {
  const slug = generateSlug(data.name)
  const docRef = await addDoc(collection(db, 'categories'), {
    ...data,
    slug,
    icon: '',
    image: '',
  })
  return docRef.id
}

export async function updateCategory(
  categoryId: string,
  data: CategoryFormData
): Promise<void> {
  const slug = generateSlug(data.name)
  await updateDoc(doc(db, 'categories', categoryId), {
    ...data,
    slug,
  })
}

export async function deleteCategory(categoryId: string): Promise<void> {
  await deleteDoc(doc(db, 'categories', categoryId))
}

export async function getCategoryProductCount(categoryName: string): Promise<number> {
  const q = query(
    collection(db, 'products'),
    where('category', '==', categoryName)
  )
  const snapshot = await getDocs(q)
  return snapshot.size
}

export async function getAllCategoriesAdmin() {
  const snapshot = await getDocs(collection(db, 'categories'))
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Array<{
    id: string
    name: string
    slug: string
    department: Department
    description: string
    icon: string
    image: string
  }>
}
