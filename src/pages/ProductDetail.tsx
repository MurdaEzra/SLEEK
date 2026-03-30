import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, ShoppingBag } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';
import { getDiscountedPrice } from '../lib/products';

export function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { products, currentUser, addToCart } = useAppContext();
  const product = products.find((entry) => entry.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const relatedProducts = useMemo(
    () =>
      products
        .filter((entry) => entry.category === product?.category && entry.id !== product?.id)
        .slice(0, 3),
    [product, products]
  );

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="mb-4 font-serif text-4xl">Product Not Found</h1>
          <Link to="/collections">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
              Back to Collections
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = getDiscountedPrice(product);
  const hasDiscount = discountedPrice !== product.price;

  const handleSecureCheckout = async () => {
    if (!selectedSize) {
      setMessage('Please select a size to continue.');
      return;
    }

    if (!currentUser || currentUser.role !== 'client') {
      navigate('/auth?role=client', {
        state: { from: `/product/${product.id}` }
      });
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    const result = await addToCart(product.id, selectedSize);
    setIsSubmitting(false);
    setMessage(result.message);

    if (result.success) {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Link
          to="/collections"
          className="mb-8 inline-flex items-center text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Collections
        </Link>

        <div className="mb-24 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2rem] bg-secondary"
          >
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            <div className="absolute left-6 top-6 flex gap-2">
              {product.isNew ? <Badge className="bg-gold text-black">New Arrival</Badge> : null}
              {product.discountPercent ? (
                <Badge className="bg-white text-black">{product.discountPercent}% Off</Badge>
              ) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col"
          >
            <p className="mb-2 text-sm uppercase tracking-[0.35em] text-muted-foreground">{product.category}</p>
            <h1 className="mb-4 font-serif text-4xl md:text-5xl">{product.name}</h1>
            <div className="mb-8 flex items-end gap-4">
              <p className="text-3xl font-semibold text-gold">${discountedPrice}</p>
              {hasDiscount ? <p className="text-lg text-white/45 line-through">${product.price}</p> : null}
            </div>

            <div className="mb-8 rounded-[1.5rem] border border-gold/15 bg-gold/10 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-gold/85">Secure checkout policy</p>
              <p className="mt-3 text-white/75">
                Clients must be signed into a SLEEK account before checkout. Admin accounts can manage stock, but cannot place client orders.
              </p>
            </div>

            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mb-8">
              <label className="mb-4 block text-sm uppercase tracking-[0.35em]">Select size</label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-6 py-3 transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-gold bg-gold text-black'
                        : 'border-gold/30 hover:border-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {message ? (
              <div className="mb-6 rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm text-white/80">
                {message}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                size="lg"
                onClick={handleSecureCheckout}
                disabled={isSubmitting}
                className="h-12 rounded-2xl bg-gold text-black hover:bg-gold/90"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black" />
                    Reserving item...
                  </span>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Secure Checkout
                  </>
                )}
              </Button>
              <Link to="/collections">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-2xl border-gold/30 bg-transparent text-gold hover:bg-gold hover:text-black"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <div className="mt-12 border-t border-gold/10 pt-8">
              <h3 className="mb-4 text-sm uppercase tracking-[0.35em]">Product details</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Premium quality materials</li>
                <li>• Signature SLEEK gold logo</li>
                <li>• Machine washable</li>
                <li>• Structured for elevated everyday wear</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length ? (
          <div>
            <h2 className="mb-8 font-serif text-3xl md:text-4xl">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
