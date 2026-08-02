import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import type { Department, Availability } from '@/types'

export interface ProductHighlight {
  label: string
  value: string
}

export interface ProductDocument {
  id: string
  name: string
  slug: string
  price: number
  department: Department
  category: string
  availability: Availability
  badge?: string
  description: string
  longDescription: string
  images: string[]
  highlights: ProductHighlight[]
  featured: boolean
  stockQuantity: number
  discountPercentage: number
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getAllProducts(): Promise<ProductDocument[]> {
  const snapshot = await getDocs(collection(db, 'products'))
  return snapshot.docs.map(mapProduct)
}

export async function getProductsByDepartment(department: string): Promise<ProductDocument[]> {
  const q = query(
    collection(db, 'products'),
    where('department', '==', department)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(mapProduct)
}

export async function getProductBySlug(slug: string): Promise<ProductDocument | null> {
  const q = query(
    collection(db, 'products'),
    where('slug', '==', slug)
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  return mapProduct(snapshot.docs[0])
}

export async function getProductById(id: string): Promise<ProductDocument | null> {
  const docRef = await getDoc(doc(db, 'products', id))
  if (!docRef.exists()) return null
  return mapProduct(docRef)
}

export async function getFeaturedProducts(): Promise<ProductDocument[]> {
  const q = query(
    collection(db, 'products'),
    where('featured', '==', true)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(mapProduct)
}

export async function getRelatedProducts(
  department: string,
  category: string,
  excludeSlug: string
): Promise<ProductDocument[]> {
  const q = query(
    collection(db, 'products'),
    where('department', '==', department),
    where('category', '==', category)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs
    .map(mapProduct)
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 4)
}

function mapProduct(docSnap: any): ProductDocument {
  const data = docSnap.data()
  return {
    id: docSnap.id,
    name: data.name ?? '',
    slug: data.slug ?? '',
    price: data.price ?? 0,
    department: data.department ?? 'electronics',
    category: data.category ?? '',
    availability: data.availability ?? 'In Stock',
    badge: data.badge ?? undefined,
    description: data.description ?? '',
    longDescription: data.longDescription ?? '',
    images: data.images ?? [],
    highlights: data.highlights ?? [],
    featured: data.featured ?? false,
    stockQuantity: data.stockQuantity ?? 0,
    discountPercentage: data.discountPercentage ?? 0,
    createdAt: data.createdAt?.toDate() ?? null,
    updatedAt: data.updatedAt?.toDate() ?? null,
  }
}
