import { Container } from '@/components/ui'
import type { DepartmentConfig } from './data'

interface DepartmentHeroProps {
  config: DepartmentConfig
}

export function DepartmentHero({ config }: DepartmentHeroProps) {
  return (
    <section className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-900">
      <img
        src={config.heroImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      <Container className="relative h-full flex flex-col justify-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
          {config.name}
        </h1>
        <p className="text-gray-200 text-sm sm:text-base max-w-lg">
          {config.description}
        </p>
      </Container>
    </section>
  )
}
