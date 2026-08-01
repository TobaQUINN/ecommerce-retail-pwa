interface ProductDescriptionProps {
  description: string
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <section className="py-8 border-t border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Product Description
      </h2>
      <p className="text-gray-600 leading-relaxed max-w-3xl">
        {description}
      </p>
    </section>
  )
}
