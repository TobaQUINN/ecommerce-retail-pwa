import {
  HeroSection,
  DepartmentSection,
  CategoriesSection,
  FeaturedProducts,
  WhyChooseUs,
  StoreInfo,
  TrustSection,
} from '@/features/home'

function Home() {
  return (
    <>
      <HeroSection />
      <DepartmentSection />
      <CategoriesSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <StoreInfo />
      <TrustSection />
    </>
  )
}

export const Component = Home
