import { useParams, Navigate } from 'react-router-dom'
import { Container } from '@/components/ui'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import {
  ImageGallery,
  ProductInfo,
  ProductDescription,
  RelatedProducts,
  TrustBadges,
  getProductBySlug,
  getRelatedProducts,
} from '@/features/product'

function Product() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) {
    return <Navigate to="/" replace />
  }

  const related = getRelatedProducts(product)
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
          <ProductInfo product={product} />
        </div>

        <ProductDescription description={product.longDescription} />
        <TrustBadges />
        <RelatedProducts products={related} />
      </Container>
    </section>
  )
}

export const Component = Product
