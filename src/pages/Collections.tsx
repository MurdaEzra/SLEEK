import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAppContext } from '../context/AppContext';

export function Collections() {
  const [searchParams] = useSearchParams();
  const { products } = useAppContext();
  const categoryParam = searchParams.get('category') as 'men' | 'women' | 'kids' | null;
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'men' | 'women' | 'kids'>(
    categoryParam || 'all'
  );
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  useEffect(() => {
    setSelectedCategory(categoryParam || 'all');
  }, [categoryParam]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered =
      selectedCategory === 'all'
        ? products
        : products.filter((product) => product.category === selectedCategory);

    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.45em] text-gold/80">Curated showroom</p>
          <h1 className="font-serif text-5xl md:text-7xl">Collections</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Discover polished essentials, statement layers, and discounted highlights updated directly from the SLEEK catalog desk.
          </p>
        </motion.div>

        <div className="mb-12 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {(['all', 'men', 'women', 'kids'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 text-sm uppercase tracking-[0.35em] transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gold text-black'
                    : 'bg-secondary text-foreground hover:bg-gold/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
            <SelectTrigger className="w-[220px] bg-secondary border-gold/20">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="border border-white/10 bg-[#141414]">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
