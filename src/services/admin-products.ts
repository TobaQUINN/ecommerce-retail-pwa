import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { db, storage } from '@/firebase/config'
import type { Department, Availability } from '@/types'

export interface ProductFormData {
  name: string
  department: Department
  category: string
  price: number
  description: string
  longDescription: string
  availability: Availability
  stockQuantity: number
  featured: boolean
  badge?: string
  highlights: { label: string; value: string }[]
  discountPercentage: number
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_IMAGES = 5

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Only JPG, PNG and WebP images are allowed.'
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return 'Image must be under 5MB.'
  }
  return null
}

export function validateImageFiles(files: File[]): string | null {
  if (files.length > MAX_IMAGES) {
    return `Maximum ${MAX_IMAGES} images allowed.`
  }
  for (const file of files) {
    const error = validateImageFile(file)
    if (error) return `${file.name}: ${error}`
  }
  return null
}

export async function uploadProductImage(file: File, productId: string): Promise<string> {
  const timestamp = Date.now()
  const extension = file.name.split('.').pop()
  const path = `products/${productId}/${timestamp}.${extension}`
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

export async function deleteProductImage(imageUrl: string): Promise<void> {
  try {
    const storageRef = ref(storage, imageUrl)
    await deleteObject(storageRef)
  } catch {
    // Image may already be deleted or URL may be external
  }
}

export async function createProduct(
  data: ProductFormData,
  imageFiles: File[]
): Promise<string> {
  const slug = generateSlug(data.name)

  const docRef = await addDoc(collection(db, 'products'), {
    ...data,
    slug,
    images: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  if (imageFiles.length > 0) {
    const imageUrls: string[] = []
    for (const file of imageFiles) {
      const url = await uploadProductImage(file, docRef.id)
      imageUrls.push(url)
    }
    await updateDoc(doc(db, 'products', docRef.id), { images: imageUrls })
  }

  return docRef.id
}

export async function updateProduct(
  productId: string,
  data: ProductFormData,
  existingImages: string[],
  newImageFiles: File[],
  removedImageUrls: string[]
): Promise<void> {
  const slug = generateSlug(data.name)

  // Delete removed images from storage
  for (const url of removedImageUrls) {
    await deleteProductImage(url)
  }

  // Upload new images
  const newUrls: string[] = []
  for (const file of newImageFiles) {
    const url = await uploadProductImage(file, productId)
    newUrls.push(url)
  }

  const images = [...existingImages, ...newUrls]

  await updateDoc(doc(db, 'products', productId), {
    ...data,
    slug,
    images,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteProduct(productId: string, imageUrls: string[]): Promise<void> {
  for (const url of imageUrls) {
    await deleteProductImage(url)
  }
  await deleteDoc(doc(db, 'products', productId))
}

