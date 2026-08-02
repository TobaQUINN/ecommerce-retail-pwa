interface CategoryFilterProps {
  categories: string[]
  activeCategory: string | null
  onSelect: (category: string | null) => void
}

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <nav aria-label="Category filters">
      <ul className="flex flex-wrap gap-2" role="list">
        <li>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeCategory === null
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-pressed={activeCategory === null}
          >
            All
          </button>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() => onSelect(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
