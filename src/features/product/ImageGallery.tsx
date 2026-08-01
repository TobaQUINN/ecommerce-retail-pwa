import { useState } from 'react'

interface ImageGalleryProps {
  images: string[]
  productName: string
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 group">
        <img
          src={images[activeIndex]}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="list" aria-label="Product images">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === activeIndex
                  ? 'border-accent ring-1 ring-accent/30'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-pressed={index === activeIndex}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
