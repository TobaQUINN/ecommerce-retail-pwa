import { useEffect, useState, useRef } from 'react'
import { Plus, Pencil, Trash2, Package, Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  validateImageFiles,
  type ProductFormData,
} from '@/services/admin-products'
import { getAllProducts, type ProductDocument } from '@/services/products'
import { getAllCategoriesAdmin } from '@/services/admin-categories'
import type { Department, Availability } from '@/types'

const DEPARTMENT_OPTIONS = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
]

const AVAILABILITY_OPTIONS = [
  { value: 'In Stock', label: 'In Stock' },
  { value: 'Limited Stock', label: 'Limited Stock' },
  { value: 'Out of Stock', label: 'Out of Stock' },
]

interface FormState {
  name: string
  department: Department
  category: string
  price: string
  description: string
  longDescription: string
  availability: Availability
  stockQuantity: string
  featured: boolean
  badge: string
  discountPercentage: string
}

const EMPTY_FORM: FormState = {
  name: '',
  department: 'electronics',
  category: '',
  price: '',
  description: '',
  longDescription: '',
  availability: 'In Stock',
  stockQuantity: '',
  featured: false,
  badge: '',
  discountPercentage: '0',
}

function Products() {
  const [products, setProducts] = useState<ProductDocument[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string; department: Department }[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<ProductDocument | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<ProductDocument | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Filters
  const [filterDept, setFilterDept] = useState<string>('')
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [search, setSearch] = useState('')

  // Form
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [removedImages, setRemovedImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function load() {
    setLoading(true)
    try {
      const [prods, cats] = await Promise.all([
        getAllProducts(),
        getAllCategoriesAdmin(),
      ])
      setProducts(prods)
      setCategories(cats)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function showSuccess(msg: string) {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const filteredCategories = categories.filter(
    (c) => c.department === form.department
  )

  const categoryOptions = filteredCategories.map((c) => ({
    value: c.name,
    label: c.name,
  }))

  // Filtered product list
  const displayProducts = products.filter((p) => {
    if (filterDept && p.department !== filterDept) return false
    if (filterCategory && p.category !== filterCategory) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const filterCategoryOptions = categories
    .filter((c) => !filterDept || c.department === filterDept)
    .map((c) => ({ value: c.name, label: c.name }))

  function openCreate() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setErrors({})
    setImageFiles([])
    setImagePreviews([])
    setExistingImages([])
    setRemovedImages([])
    setModalOpen(true)
  }

  function openEdit(product: ProductDocument) {
    setEditing(product)
    setForm({
      name: product.name,
      department: product.department,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      longDescription: product.longDescription,
      availability: product.availability,
      stockQuantity: product.stockQuantity.toString(),
      featured: product.featured,
      badge: product.badge || '',
      discountPercentage: product.discountPercentage.toString(),
    })
    setExistingImages(product.images || [])
    setRemovedImages([])
    setImageFiles([])
    setImagePreviews([])
    setErrors({})
    setModalOpen(true)
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const totalImages = existingImages.length + imageFiles.length + files.length
    if (totalImages > 5) {
      setErrors((prev) => ({ ...prev, images: 'Maximum 5 images allowed.' }))
      return
    }

    const validationError = validateImageFiles(files)
    if (validationError) {
      setErrors((prev) => ({ ...prev, images: validationError }))
      return
    }

    setErrors((prev) => { const { images, ...rest } = prev; return rest })
    setImageFiles((prev) => [...prev, ...files])

    const previews = files.map((f) => URL.createObjectURL(f))
    setImagePreviews((prev) => [...prev, ...previews])

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removeNewImage(index: number) {
    URL.revokeObjectURL(imagePreviews[index])
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  function removeExistingImage(url: string) {
    setExistingImages((prev) => prev.filter((u) => u !== url))
    setRemovedImages((prev) => [...prev, url])
  }

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Product name is required.'
    if (!form.category) e.category = 'Category is required.'

    const price = parseFloat(form.price)
    if (!form.price || isNaN(price) || price <= 0) {
      e.price = 'Enter a valid positive price.'
    }

    const stock = parseInt(form.stockQuantity, 10)
    if (form.stockQuantity === '' || isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
      e.stockQuantity = 'Enter a valid whole number (0 or above).'
    }

    if (!form.description.trim()) e.description = 'Description is required.'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSave() {
    if (!validate()) return
    setSaving(true)
    try {
      const data: ProductFormData = {
        name: form.name.trim(),
        department: form.department,
        category: form.category,
        price: parseFloat(form.price),
        description: form.description.trim(),
        longDescription: form.longDescription.trim(),
        availability: form.availability,
        stockQuantity: parseInt(form.stockQuantity, 10),
        featured: form.featured,
        badge: form.badge.trim() || undefined,
        highlights: [],
        discountPercentage: parseFloat(form.discountPercentage) || 0,
      }

      if (editing) {
        await updateProduct(editing.id, data, existingImages, imageFiles, removedImages)
        showSuccess('Product updated successfully.')
      } else {
        await createProduct(data, imageFiles)
        showSuccess('Product created successfully.')
      }
      setModalOpen(false)
      await load()
    } catch (err: any) {
      setErrors({ form: err.message || 'Something went wrong.' })
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteProduct(deleteTarget.id, deleteTarget.images || [])
      setDeleteTarget(null)
      showSuccess('Product deleted.')
      await load()
    } catch (err: any) {
      setErrors({ form: err.message || 'Failed to delete product.' })
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} total products</p>
        </div>
        <Button onClick={openCreate} size="sm">
          <Plus size={16} className="mr-1.5" />
          Add Product
        </Button>
      </div>

      {/* Success toast */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent w-full sm:w-56"
        />
        <select
          value={filterDept}
          onChange={(e) => { setFilterDept(e.target.value); setFilterCategory('') }}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
        >
          <option value="">All Departments</option>
          {DEPARTMENT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
        >
          <option value="">All Categories</option>
          {filterCategoryOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Product list */}
      {displayProducts.length === 0 ? (
        <EmptyState
          icon={<Package size={40} />}
          title={products.length === 0 ? 'No products yet' : 'No products match your filters'}
          description={
            products.length === 0
              ? 'Add your first product to get started.'
              : 'Try adjusting your search or filters.'
          }
          action={
            products.length === 0 ? (
              <Button onClick={openCreate} size="sm">
                <Plus size={16} className="mr-1.5" />
                Add Product
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Product</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Price</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Stock</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt=""
                            className="w-10 h-10 rounded-md object-cover bg-gray-100"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                            <ImageIcon size={16} className="text-gray-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate max-w-[200px]">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">{product.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{product.category}</td>
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      ₦{product.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{product.stockQuantity}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          product.availability === 'In Stock'
                            ? 'bg-green-50 text-green-700'
                            : product.availability === 'Limited Stock'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {product.availability}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(product)}
                          className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                          aria-label={`Edit ${product.name}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(product)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md"
                          aria-label={`Delete ${product.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {displayProducts.map((product) => (
              <div key={product.id} className="p-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-12 h-12 rounded-md object-cover bg-gray-100 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                      <ImageIcon size={16} className="text-gray-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      ₦{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEdit(product)}
                    className="p-2 text-gray-400 hover:text-gray-700"
                    aria-label={`Edit ${product.name}`}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(product)}
                    className="p-2 text-gray-400 hover:text-red-600"
                    aria-label={`Delete ${product.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Product' : 'New Product'}
      >
        <div className="space-y-4">
          {errors.form && (
            <p className="text-sm text-error bg-red-50 px-3 py-2 rounded-md">{errors.form}</p>
          )}

          <Input
            id="prod-name"
            label="Product Name"
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            error={errors.name}
            placeholder="e.g. Wireless Bluetooth Earbuds"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              id="prod-department"
              label="Department"
              value={form.department}
              onChange={(e) => {
                setField('department', e.target.value as Department)
                setField('category', '')
              }}
              options={DEPARTMENT_OPTIONS}
            />
            <Select
              id="prod-category"
              label="Category"
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
              options={categoryOptions}
              placeholder="Select category"
              error={errors.category}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="prod-price"
              label="Price (₦)"
              type="number"
              min="1"
              step="0.01"
              value={form.price}
              onChange={(e) => setField('price', e.target.value)}
              error={errors.price}
              placeholder="e.g. 12500"
            />
            <Input
              id="prod-stock"
              label="Stock Quantity"
              type="number"
              min="0"
              step="1"
              value={form.stockQuantity}
              onChange={(e) => setField('stockQuantity', e.target.value)}
              error={errors.stockQuantity}
              placeholder="e.g. 50"
            />
          </div>

          <Select
            id="prod-availability"
            label="Availability"
            value={form.availability}
            onChange={(e) => setField('availability', e.target.value as Availability)}
            options={AVAILABILITY_OPTIONS}
          />

          <Textarea
            id="prod-description"
            label="Short Description"
            value={form.description}
            onChange={(e) => setField('description', e.target.value)}
            error={errors.description}
            placeholder="Brief product description"
            rows={2}
          />

          <Textarea
            id="prod-long-description"
            label="Full Description (optional)"
            value={form.longDescription}
            onChange={(e) => setField('longDescription', e.target.value)}
            placeholder="Detailed product description"
            rows={3}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="prod-featured"
              checked={form.featured}
              onChange={(e) => setField('featured', e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="prod-featured" className="text-sm text-gray-700">
              Featured product (shown on homepage)
            </label>
          </div>

          {/* Image upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Product Images (max 5, JPG/PNG/WebP, under 5MB each)
            </label>

            {/* Existing images */}
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {existingImages.map((url) => (
                  <div key={url} className="relative w-16 h-16">
                    <img src={url} alt="" className="w-full h-full object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(url)}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5"
                      aria-label="Remove image"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New image previews */}
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {imagePreviews.map((src, i) => (
                  <div key={src} className="relative w-16 h-16">
                    <img src={src} alt="" className="w-full h-full object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(i)}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5"
                      aria-label="Remove image"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {(existingImages.length + imageFiles.length) < 5 && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                  id="prod-images"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                >
                  <Upload size={16} />
                  Upload Images
                </button>
              </div>
            )}

            {errors.images && (
              <p className="text-sm text-error">{errors.images}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} isLoading={saving}>
              {editing ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Product"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This will also remove its images. This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm} isLoading={deleting}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export const Component = Products
