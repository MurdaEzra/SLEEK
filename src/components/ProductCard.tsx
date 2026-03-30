import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { getDiscountedPrice, type Product } from '../lib/products';

export function ProductCard({
  product,
  index = 0
}: {
  product: Product;
  index?: number;
}) {
  const discountedPrice = getDiscountedPrice(product);
  const hasDiscount = discountedPrice !== product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-white/8 bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />
          <div className="absolute left-4 top-4 flex gap-2">
            {product.isNew ? <Badge className="bg-gold text-black">New Arrival</Badge> : null}
            {product.discountPercent ? (
              <Badge className="bg-white text-black">{product.discountPercent}% Off</Badge>
            ) : null}
          </div>
          <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 transition-transform duration-300 group-hover:translate-y-0">
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-white/65">{product.category}</p>
            <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
            <div className="flex items-center gap-3">
              <p className="text-xl font-semibold text-gold">${discountedPrice}</p>
              {hasDiscount ? (
                <p className="text-sm text-white/45 line-through">${product.price}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="transition-opacity duration-300 group-hover:opacity-80">
          <p className="mb-1 text-xs uppercase tracking-[0.35em] text-muted-foreground">{product.category}</p>
          <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-gold">${discountedPrice}</p>
            {hasDiscount ? (
              <p className="text-sm text-muted-foreground line-through">${product.price}</p>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
