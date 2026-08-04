import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/firebase/config'
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

async function uploadProductImage(file: File): Promise<string> {
  const res = await fetch('/api/upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: file.name, contentType: file.type }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Upload URL request failed: ${res.status} ${text}`)
  }

  const { uploadUrl, publicUrl } = await res.json()

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })

  if (!uploadRes.ok) {
    throw new Error(`S3 upload failed: ${uploadRes.status} ${uploadRes.statusText}`)
  }

  return publicUrl
}

export async function createProduct(
  data: ProductFormData,
  imageFiles: File[]
): Promise<string> {
  const slug = generateSlug(data.name)

  const productData: any = {
    ...data,
    slug,
    images: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  if (!productData.badge) delete productData.badge

  const docRef = await addDoc(collection(db, 'products'), productData)

  if (imageFiles.length > 0) {
    const imageUrls: string[] = []
    for (const file of imageFiles) {
      const url = await uploadProductImage(file)
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

  // Upload new images
  const newUrls: string[] = []
  for (const file of newImageFiles) {
    const url = await uploadProductImage(file)
    newUrls.push(url)
  }

  const images = [...existingImages.filter((u) => !removedImageUrls.includes(u)), ...newUrls]

  const updateData: any = {
    ...data,
    slug,
    images,
    updatedAt: serverTimestamp(),
  }

  if (!updateData.badge) delete updateData.badge

  await updateDoc(doc(db, 'products', productId), updateData)
}

export async function deleteProduct(productId: string, imageUrls: string[]): Promise<void> {
  void imageUrls // S3 images can be cleaned up separately if needed
  await deleteDoc(doc(db, 'products', productId))
}
