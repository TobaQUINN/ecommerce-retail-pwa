import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Container } from '@/components/ui'
import { DepartmentHero, DepartmentContent, departmentConfigs } from '@/features/department'
import { getProductsByDepartment } from '@/services/products'
import type { ProductDocument } from '@/services/products'
import type { ProductCardData } from '@/components/common/ProductCard'

function Department() {
  const { department } = useParams<{ department: string }>()
  const config = department ? departmentConfigs[department] : undefined
  const [products, setProducts] = useState<ProductCardData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!department || !config) return
    setLoading(true)
    getProductsByDepartment(department)
      .then((docs: ProductDocument[]) => {
        setProducts(
          docs.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.price,
            image: p.images[0] ?? '',
            department: p.department,
            availability: p.availability,
            badge: p.badge,
            category: p.category,
          }))
        )
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [department, config])

  if (!config) {
    return <Navigate to="/" replace />
  }

  if (loading) {
    return (
      <>
        <DepartmentHero config={config} />
        <section className="py-10">
          <Container>
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
          </Container>
        </section>
      </>
    )
  }

  return (
    <>
      <DepartmentHero config={config} />
      <DepartmentContent config={config} products={products} />
    </>
  )
}

export const Component = Department
