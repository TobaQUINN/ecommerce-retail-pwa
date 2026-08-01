import { Button } from '@/components/ui'
import { Spinner } from '@/components/ui'

interface PaginationProps {
  hasMore: boolean
  isLoading: boolean
  onLoadMore: () => void
  currentCount: number
  totalCount: number
}

export function Pagination({ hasMore, isLoading, onLoadMore, currentCount, totalCount }: PaginationProps) {
  if (!hasMore && currentCount >= totalCount) return null

  return (
    <div className="flex flex-col items-center gap-3 pt-8">
      <p className="text-sm text-gray-500">
        Showing {currentCount} of {totalCount} products
      </p>
      {hasMore && (
        <Button
          variant="secondary"
          onClick={onLoadMore}
          disabled={isLoading}
          className="min-w-[160px]"
        >
          {isLoading ? <Spinner size="sm" /> : 'Load More'}
        </Button>
      )}
    </div>
  )
}
