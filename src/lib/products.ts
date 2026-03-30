export type ProductCategory = 'men' | 'women' | 'kids';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  description: string;
  sizes: string[];
  isNew?: boolean;
  discountPercent?: number;
}

export const seedProducts: Product[] = [
  {
    id: '1',
    name: 'Signature Black Tracksuit',
    price: 189,
    category: 'men',
    image: '/file_00000000b94c71fda2f8c8cac8f59657.png',
    description:
      'Premium heavyweight cotton blend tracksuit featuring the iconic SLEEK gold logo. Designed for comfort and city-bound refinement.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
    discountPercent: 10
  },
  {
    id: '2',
    name: 'Essential White Hoodie Dress',
    price: 149,
    category: 'women',
    image: '/IMG_20251225_201231_401.png',
    description:
      'Sleeveless hoodie dress in premium white cotton. A sharp resort-to-street silhouette with elevated softness.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true
  },
  {
    id: '3',
    name: 'Burgundy Hoodie Dress',
    price: 149,
    category: 'women',
    image: '/file_00000000b0c871fd9292ceb23a596d7b.png',
    description:
      'Luxurious burgundy sleeveless hoodie dress balancing sculpted drape with all-day comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '4',
    name: 'Kids Blue Tracksuit',
    price: 89,
    category: 'kids',
    image: '/PSX_20251229_172911.png',
    description:
      'Youth-sized tracksuit in vibrant blue with an easy fit and durable finish for everyday wear.',
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y', '14Y']
  },
  {
    id: '5',
    name: 'Black Signature Hoodie',
    price: 129,
    category: 'men',
    image: '/file_00000000b94c71fda2f8c8cac8f59657.png',
    description:
      'Classic black hoodie with gold SLEEK branding and a tailored relaxed fit.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    discountPercent: 15
  },
  {
    id: '6',
    name: 'White Athletic Dress',
    price: 139,
    category: 'women',
    image: '/IMG_20251225_201231_401.png',
    description: 'Modern athletic dress combining functional movement with polished minimal lines.',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '7',
    name: 'Kids Essential Hoodie',
    price: 69,
    category: 'kids',
    image: '/PSX_20251229_172911.png',
    description: 'Comfortable everyday hoodie for kids, built to last and layer easily.',
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y', '14Y']
  },
  {
    id: '8',
    name: 'Signature Joggers',
    price: 99,
    category: 'men',
    image: '/file_00000000b94c71fda2f8c8cac8f59657.png',
    description: 'Premium joggers with subtle gold logo detailing and a clean tapered finish.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  }
];

export function getDiscountedPrice(product: Product) {
  if (!product.discountPercent) {
    return product.price;
  }

  return Number((product.price * (1 - product.discountPercent / 100)).toFixed(2));
}
