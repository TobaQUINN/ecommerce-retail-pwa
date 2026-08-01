import type { Availability, Department } from '@/types'

export interface ProductHighlight {
  label: string
  value: string
}

export interface ProductDetail {
  id: string
  name: string
  slug: string
  price: number
  department: Department
  category: string
  availability: Availability
  badge?: string
  description: string
  longDescription: string
  images: string[]
  highlights: ProductHighlight[]
}

const electronicsDetailProducts: ProductDetail[] = [
  {
    id: 'e1',
    name: 'Wireless Bluetooth Earbuds Pro',
    slug: 'wireless-bluetooth-earbuds-pro',
    price: 12500,
    department: 'electronics',
    category: 'Audio & Sound',
    availability: 'In Stock',
    badge: 'Best Seller',
    description: 'Premium wireless earbuds with deep bass and crystal-clear audio. Perfect for music, calls, and workouts.',
    longDescription: 'Experience immersive sound with these premium wireless Bluetooth earbuds. Featuring advanced noise isolation technology, these earbuds deliver deep bass and crystal-clear highs for an exceptional listening experience. The ergonomic design ensures a comfortable fit for extended wear, while the IPX4 water resistance rating makes them perfect for workouts and outdoor activities. With up to 6 hours of playback on a single charge and an additional 24 hours from the compact charging case, you can enjoy your music all day long.',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12f8e4e12?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600&h=600&fit=crop',
    ],
    highlights: [
      { label: 'Connectivity', value: 'Bluetooth 5.3' },
      { label: 'Battery Life', value: '6 hours (30 with case)' },
      { label: 'Water Resistance', value: 'IPX4' },
      { label: 'Colour', value: 'Black' },
      { label: 'Compatibility', value: 'iOS & Android' },
    ],
  },
  {
    id: 'e2',
    name: 'Smart Watch Series 5',
    slug: 'smart-watch-series-5',
    price: 35000,
    department: 'electronics',
    category: 'Smart Devices',
    availability: 'In Stock',
    badge: 'New Arrival',
    description: 'Feature-packed smartwatch with health monitoring, notifications, and a stunning AMOLED display.',
    longDescription: 'Stay connected and track your health with this advanced smartwatch. The vibrant 1.75-inch AMOLED display delivers sharp visuals even in direct sunlight. Monitor your heart rate, blood oxygen levels, sleep quality, and daily activity with precision sensors. Receive notifications, control your music, and track workouts across 100+ exercise modes. The sleek metal casing and comfortable silicone band make it suitable for both casual and formal settings.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop',
    ],
    highlights: [
      { label: 'Display', value: '1.75" AMOLED' },
      { label: 'Battery Life', value: '7 days' },
      { label: 'Water Resistance', value: 'IP68' },
      { label: 'Colour', value: 'Midnight Black' },
      { label: 'Compatibility', value: 'iOS & Android' },
      { label: 'Sensors', value: 'Heart Rate, SpO2, Accelerometer' },
    ],
  },
  {
    id: 'e3',
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    price: 18000,
    department: 'electronics',
    category: 'Audio & Sound',
    availability: 'Limited Stock',
    badge: 'Best Seller',
    description: 'Powerful portable speaker with 360° sound, deep bass, and rugged waterproof design.',
    longDescription: 'Take your music everywhere with this powerful portable Bluetooth speaker. Delivering rich 360° surround sound with enhanced bass, it fills any room or outdoor space with impressive audio. The rugged, waterproof IPX7 design means it can handle splashes, rain, and even submersion, making it perfect for pool parties, beach trips, and adventures. Connect two speakers for stereo sound or use the built-in microphone for hands-free calls.',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&h=600&fit=crop',
    ],
    highlights: [
      { label: 'Connectivity', value: 'Bluetooth 5.0' },
      { label: 'Battery Life', value: '12 hours' },
      { label: 'Water Resistance', value: 'IPX7' },
      { label: 'Output', value: '20W' },
      { label: 'Colour', value: 'Navy Blue' },
    ],
  },
]

const fashionDetailProducts: ProductDetail[] = [
  {
    id: 'f5',
    name: 'Premium Leather Belt',
    slug: 'premium-leather-belt',
    price: 8500,
    department: 'fashion',
    category: 'Accessories',
    availability: 'In Stock',
    badge: 'Best Seller',
    description: 'Handcrafted genuine leather belt with a polished metal buckle. A timeless accessory for any wardrobe.',
    longDescription: 'Elevate your style with this handcrafted genuine leather belt. Made from carefully selected full-grain leather, this belt develops a beautiful patina over time, making it uniquely yours. The polished stainless steel buckle adds a sophisticated touch, while the precise stitching ensures long-lasting durability. Suitable for both formal and casual occasions, this versatile belt is a wardrobe essential.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop',
    ],
    highlights: [
      { label: 'Material', value: 'Full-Grain Leather' },
      { label: 'Buckle', value: 'Stainless Steel' },
      { label: 'Width', value: '35mm' },
      { label: 'Colour', value: 'Dark Brown' },
    ],
  },
  {
    id: 'f7',
    name: 'Gold Chain Necklace',
    slug: 'gold-chain-necklace',
    price: 12000,
    department: 'fashion',
    category: 'Jewellery',
    availability: 'In Stock',
    badge: 'Best Seller',
    description: 'Elegant gold-plated chain necklace with a modern minimalist design. Hypoallergenic and tarnish-resistant.',
    longDescription: 'Make a statement with this elegant gold-plated chain necklace. Crafted with precision, this minimalist piece features a durable 18K gold plating over stainless steel that resists tarnishing and fading. The hypoallergenic material makes it safe for sensitive skin. Whether worn alone or layered with other pieces, this versatile necklace adds a touch of sophistication to any outfit. Comes in a premium gift box.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515562141589-67f0d999b7f6?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    ],
    highlights: [
      { label: 'Material', value: '18K Gold Plated Stainless Steel' },
      { label: 'Length', value: '50cm' },
      { label: 'Style', value: 'Cuban Link' },
      { label: 'Colour', value: 'Gold' },
    ],
  },
  {
    id: 'f3',
    name: "Women's Seamless Underwear Set",
    slug: 'womens-seamless-underwear-set',
    price: 6500,
    department: 'fashion',
    category: "Women's Underwear",
    availability: 'In Stock',
    badge: 'New Arrival',
    description: 'Ultra-comfortable seamless underwear set in breathable fabric. Invisible under clothing for a smooth silhouette.',
    longDescription: 'Experience all-day comfort with this seamless underwear set designed for the modern woman. Made from premium breathable microfibre fabric, these pieces are virtually invisible under clothing, giving you a smooth, confident silhouette. The seamless construction eliminates irritating seams and tags, while the wide elastic waistband stays in place without digging in. Available in neutral tones that work under any outfit.',
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&h=600&fit=crop',
    ],
    highlights: [
      { label: 'Material', value: 'Microfibre Blend' },
      { label: 'Pieces', value: '3 Pack' },
      { label: 'Colour', value: 'Nude/Black/Grey' },
    ],
  },
]

const allProducts = [...electronicsDetailProducts, ...fashionDetailProducts]

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return allProducts.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: ProductDetail): ProductDetail[] {
  return allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.department === product.department))
    .slice(0, 4)
}
