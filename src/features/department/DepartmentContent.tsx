import { useMemo, useState } from 'react'
import { Container, EmptyState } from '@/components/ui'
import { ProductCard } from '@/components/common/ProductCard'
import { ProductGrid } from '@/components/common/ProductGrid'
import { SearchBar } from '@/components/common/SearchBar'
import { CategoryFilter } from '@/components/common/CategoryFilter'
import { SortControls, type SortOption } from '@/components/common/SortControls'
import { Pagination } from '@/components/common/Pagination'
import type { ProductCardData } from '@/components/common/ProductCard'
import type { DepartmentConfig } from './data'

const PRODUCTS_PER_PAGE = 8

interface DepartmentContentProps {
  config: DepartmentConfig
  products: ProductCardData[]
}

function sortProducts(products: ProductCardData[], sort: SortOption): ProductCardData[] {
  const sorted = [...products]
  switch (sort) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name-az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-za':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'newest':
      return sorted.reverse()
    default:
      return sorted
  }
}

export function DepartmentContent({ config, products }: DepartmentContentProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [sort, setSort] = useState<SortOption>('default')
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE)

  const filteredProducts = useMemo(() => {
    let result = products

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.category && p.category.toLowerCase().includes(query))
      )
    }

    return sortProducts(result, sort)
  }, [products, activeCategory, search, sort])

  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProducts.length

  function handleCategoryChange(category: string | null) {
    setActiveCategory(category)
    setVisibleCount(PRODUCTS_PER_PAGE)
  }

  function handleSearchChange(value: string) {
    setSearch(value)
    setVisibleCount(PRODUCTS_PER_PAGE)
  }

  function handleLoadMore() {
    setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE)
  }

  return (
    <section className="py-6 sm:py-8 lg:py-10">
      <Container>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={handleSearchChange}
                placeholder={`Search ${config.name.toLowerCase()}...`}
              />
            </div>
          </div>

          <CategoryFilter
            categories={config.categories}
            activeCategory={activeCategory}
            onSelect={handleCategoryChange}
          />

          <SortControls
            value={sort}
            onChange={setSort}
            resultCount={filteredProducts.length}
          />

          {filteredProducts.length === 0 ? (
            <EmptyState
              title="No products found"
              description={
                search
                  ? `No results for "${search}". Try a different search term.`
                  : 'No products in this category yet. Check back soon!'
              }
              action={
                (search || activeCategory) ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('')
                      setActiveCategory(null)
                    }}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    Clear all filters
                  </button>
                ) : undefined
              }
            />
          ) : (
            <>
              <ProductGrid>
                {visibleProducts.map((product) => (
                  <div key={product.id} role="listitem">
                    <ProductCard product={product} />
                  </div>
                ))}
              </ProductGrid>

              <Pagination
                hasMore={hasMore}
                isLoading={false}
                onLoadMore={handleLoadMore}
                currentCount={visibleProducts.length}
                totalCount={filteredProducts.length}
              />
            </>
          )}
        </div>
      </Container>
    </section>
  )
}
