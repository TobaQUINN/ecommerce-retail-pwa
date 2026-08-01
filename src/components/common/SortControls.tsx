import { ArrowUpDown } from 'lucide-react'

export type SortOption = 'default' | 'price-low' | 'price-high' | 'name-az' | 'name-za' | 'newest'

interface SortControlsProps {
  value: SortOption
  onChange: (value: SortOption) => void
  resultCount: number
}

const sortLabels: Record<SortOption, string> = {
  default: 'Default',
  'price-low': 'Price: Low to High',
  'price-high': 'Price: High to Low',
  'name-az': 'Name: A–Z',
  'name-za': 'Name: Z–A',
  newest: 'Newest First',
}

export function SortControls({ value, onChange, resultCount }: SortControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-900">{resultCount}</span>{' '}
        {resultCount === 1 ? 'product' : 'products'}
      </p>

      <div className="flex items-center gap-2">
        <ArrowUpDown size={14} className="text-gray-400" aria-hidden="true" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent/50"
          aria-label="Sort products"
        >
          {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
