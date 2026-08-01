import type { Department } from '@/types'

export interface FeaturedProduct {
  id: string
  name: string
  price: number
  image: string
  department: Department
  availability: string
  badge?: string
}

export interface CategoryCard {
  id: string
  name: string
  department: Department
  image: string
  productCount: number
}

export const featuredProducts: FeaturedProduct[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Earbuds',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12f8e4e12?w=400&h=400&fit=crop',
    department: 'electronics',
    availability: 'In Stock',
    badge: 'Best Seller',
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    department: 'electronics',
    availability: 'In Stock',
    badge: 'New Arrival',
  },
  {
    id: '3',
    name: 'Premium Leather Belt',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    department: 'fashion',
    availability: 'In Stock',
  },
  {
    id: '4',
    name: 'Portable Bluetooth Speaker',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    department: 'electronics',
    availability: 'Limited Stock',
    badge: 'Best Seller',
  },
  {
    id: '5',
    name: 'Designer Sunglasses',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    department: 'fashion',
    availability: 'In Stock',
    badge: 'New Arrival',
  },
  {
    id: '6',
    name: 'USB-C Fast Charger',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    department: 'electronics',
    availability: 'In Stock',
  },
]

export const categories: CategoryCard[] = [
  {
    id: '1',
    name: 'Phone Accessories',
    department: 'electronics',
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=300&h=200&fit=crop',
    productCount: 24,
  },
  {
    id: '2',
    name: 'Audio & Sound',
    department: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    productCount: 18,
  },
  {
    id: '3',
    name: 'Fashion Accessories',
    department: 'fashion',
    image: 'https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=300&h=200&fit=crop',
    productCount: 32,
  },
  {
    id: '4',
    name: 'Smart Devices',
    department: 'electronics',
    image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=300&h=200&fit=crop',
    productCount: 15,
  },
]
