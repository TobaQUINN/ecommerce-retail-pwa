import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Container } from '@/components/ui'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import {
  ImageGallery,
  ProductInfo,
  ProductDescription,
  RelatedProducts,
  TrustBadges,
} from '@/features/product'
import { getProductBySlug, getRelatedProducts } from '@/services/products'
import type { ProductDocument } from '@/services/products'



function toProductDetail(p: ProductDocument) {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    department: p.department,
    category: p.category,
    availability: p.availability,
    badge: p.badge,
    description: p.description,
    longDescription: p.longDescription,
    images: p.images,
    highlights: p.highlights,
  }
}

function Product() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<ProductDocument | null | undefined>(undefined)
  const [related, setRelated] = useState<{ id: string; slug: string; name: string; price: number; image: string; badge?: string }[]>([])

  useEffect(() => {
    if (!slug) return
    setProduct(undefined)
    getProductBySlug(slug)
      .then((doc) => {
        setProduct(doc)
        if (doc) {
          getRelatedProducts(doc.department, doc.category, doc.slug).then((docs) =>
            setRelated(
              docs.map((r) => ({
                id: r.id,
                name: r.name,
                slug: r.slug,
                price: r.price,
                image: r.images[0] ?? '',
                badge: r.badge,
              }))
            )
          )
        }
      })
      .catch(() => setProduct(null))
  }, [slug])

  if (product === undefined) {
    return (
      <section className="py-10">
        <Container>
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        </Container>
      </section>
    )
  }

  if (!product) {
    return <Navigate to="/" replace />
  }

  const detail = toProductDetail(product)
  const departmentLabel = product.department === 'electronics' ? 'Electronics' : 'Fashion'

  return (
    <section className="py-6 sm:py-8 lg:py-10">
      <Container>
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: departmentLabel, to: `/${product.department}` },
            { label: product.category },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <ImageGallery images={product.images} productName={product.name} />
          <ProductInfo product={detail} />
        </div>

        <ProductDescription description={product.longDescription} />
        <TrustBadges />
        <RelatedProducts products={related} />
      </Container>
    </section>
  )
}

export const Component = Product
