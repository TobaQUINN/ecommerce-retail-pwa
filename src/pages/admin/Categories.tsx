import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import {
  getAllCategoriesAdmin,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProductCount,
  type CategoryFormData,
} from '@/services/admin-categories'
import type { Department } from '@/types'

interface CategoryRow {
  id: string
  name: string
  slug: string
  department: Department
  description: string
}

const DEPARTMENT_OPTIONS = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
]

function Categories() {
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<CategoryRow | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<CategoryRow | null>(null)
  const [deleteError, setDeleteError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Form state
  const [name, setName] = useState('')
  const [department, setDepartment] = useState<Department>('electronics')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function load() {
    setLoading(true)
    try {
      const data = await getAllCategoriesAdmin()
      setCategories(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function showSuccess(msg: string) {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  function openCreate() {
    setEditing(null)
    setName('')
    setDepartment('electronics')
    setDescription('')
    setErrors({})
    setModalOpen(true)
  }

  function openEdit(cat: CategoryRow) {
    setEditing(cat)
    setName(cat.name)
    setDepartment(cat.department)
    setDescription(cat.description)
    setErrors({})
    setModalOpen(true)
  }

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Category name is required.'
    if (!department) e.department = 'Department is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSave() {
    if (!validate()) return
    setSaving(true)
    try {
      const formData: CategoryFormData = {
        name: name.trim(),
        department,
        description: description.trim(),
      }
      if (editing) {
        await updateCategory(editing.id, formData)
        showSuccess('Category updated successfully.')
      } else {
        await createCategory(formData)
        showSuccess('Category created successfully.')
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
    setDeleteError('')
    try {
      const count = await getCategoryProductCount(deleteTarget.name)
      if (count > 0) {
        setDeleteError(
          `Cannot delete "${deleteTarget.name}" — ${count} product${count > 1 ? 's are' : ' is'} still assigned to it. Reassign those products first.`
        )
        setDeleting(false)
        return
      }
      await deleteCategory(deleteTarget.id)
      setDeleteTarget(null)
      showSuccess('Category deleted.')
      await load()
    } catch (err: any) {
      setDeleteError(err.message || 'Failed to delete category.')
    } finally {
      setDeleting(false)
    }
  }

  const grouped = categories.reduce<Record<string, CategoryRow[]>>((acc, cat) => {
    const dept = cat.department || 'other'
    if (!acc[dept]) acc[dept] = []
    acc[dept].push(cat)
    return acc
  }, {})

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage product categories</p>
        </div>
        <Button onClick={openCreate} size="sm">
          <Plus size={16} className="mr-1.5" />
          Add Category
        </Button>
      </div>

      {/* Success toast */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Category list */}
      {categories.length === 0 ? (
        <EmptyState
          icon={<FolderOpen size={40} />}
          title="No categories yet"
          description="Create your first category to start organizing products."
          action={
            <Button onClick={openCreate} size="sm">
              <Plus size={16} className="mr-1.5" />
              Add Category
            </Button>
          }
        />
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([dept, cats]) => (
            <div key={dept} className="bg-white rounded-lg border border-gray-200">
              <div className="px-5 py-3 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {dept}
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {cats.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                      {cat.description && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate max-w-md">
                          {cat.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEdit(cat)}
                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        aria-label={`Edit ${cat.name}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => { setDeleteTarget(cat); setDeleteError('') }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        aria-label={`Delete ${cat.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Category' : 'New Category'}
      >
        <div className="space-y-4">
          {errors.form && (
            <p className="text-sm text-error bg-red-50 px-3 py-2 rounded-md">{errors.form}</p>
          )}
          <Input
            id="cat-name"
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            placeholder="e.g. Audio & Sound"
          />
          <Select
            id="cat-department"
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value as Department)}
            options={DEPARTMENT_OPTIONS}
            error={errors.department}
          />
          <Textarea
            id="cat-description"
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of this category"
            rows={2}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} isLoading={saving}>
              {editing ? 'Save Changes' : 'Create Category'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Category"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
          </p>
          {deleteError && (
            <p className="text-sm text-error bg-red-50 px-3 py-2 rounded-md">{deleteError}</p>
          )}
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

export const Component = Categories
