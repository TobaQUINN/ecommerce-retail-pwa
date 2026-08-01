import {
  HeroSection,
  DepartmentSection,
  CategoriesSection,
  FeaturedProducts,
  WhyChooseUs,
  ShoppingProcess,
  StoreInfo,
  TrustSection,
  CTASection,
} from '@/features/home'

function Home() {
  return (
    <>
      <HeroSection />
      <DepartmentSection />
      <CategoriesSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <ShoppingProcess />
      <StoreInfo />
      <TrustSection />
      <CTASection />
    </>
  )
}

export const Component = Home
