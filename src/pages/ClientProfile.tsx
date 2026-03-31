import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, MapPin, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAppContext } from '../context/AppContext';
import { getDiscountedPrice } from '../lib/products';

export function ClientProfile() {
  const { currentUser, products, cart } = useAppContext();

  if (!currentUser) {
    return null;
  }

  const cartProducts = cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return product ? { item, product } : null;
    })
    .filter(Boolean) as Array<{
    item: (typeof cart)[number];
    product: (typeof products)[number];
  }>;

  const total = cartProducts.reduce(
    (sum, entry) => sum + getDiscountedPrice(entry.product) * entry.item.quantity,
    0
  );

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(200,168,78,0.14),rgba(255,255,255,0.03))]">
            <div className="border-b border-white/10 p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold/80">Client profile</p>
              <div className="flex items-center gap-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-gold/30"
                />
                <div>
                  <h1 className="font-serif text-4xl">{currentUser.fullName}</h1>
                  <p className="text-white/65">{currentUser.email}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 p-8">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/45">Membership</p>
                <h2 className="text-xl">{currentUser.loyaltyTier}</h2>
                <p className="mt-2 text-sm text-white/60">Private styling access, priority checkout, and seasonal previews.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <div className="mb-2 flex items-center gap-2 text-gold">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.3em]">Delivery address</span>
                </div>
                <p className="text-white/75">{currentUser.address}</p>
                <p className="mt-2 text-sm text-white/55">{currentUser.phone}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <div className="mb-2 flex items-center gap-2 text-gold">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.3em]">Account status</span>
                </div>
                <p className="text-white/75">Verified for secure checkout</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.4em] text-gold/80">Secure checkout bag</p>
                <h2 className="font-serif text-4xl">Ready to purchase</h2>
              </div>
              <Link to="/collections">
                <Button variant="outline" className="border-gold/30 bg-transparent text-gold hover:bg-gold hover:text-black">
                  Continue shopping
                </Button>
              </Link>
            </div>

            {cartProducts.length ? (
              <div className="space-y-4">
                {cartProducts.map(({ item, product }) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-black/25 p-5 md:flex-row md:items-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-28 w-full rounded-[1.25rem] object-cover md:w-28"
                    />
                    <div className="flex-1">
                      <p className="mb-1 text-xs uppercase tracking-[0.3em] text-white/45">{product.category}</p>
                      <h3 className="text-lg">{product.name}</h3>
                      <p className="mt-2 text-sm text-white/65">Size {item.size} • Qty {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gold">
                        Ksh.{(getDiscountedPrice(product) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-gold/20 bg-gold/10 p-6 md:flex-row md:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-gold/80">Order total</p>
                    <h3 className="mt-2 font-serif text-3xl">Ksh.{total.toFixed(2)}</h3>
                  </div>
                  <Link to="/checkout">
                    <Button size="lg" className="h-12 rounded-2xl bg-gold px-8 text-black hover:bg-gold/90">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Continue to checkout
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-black/20 px-6 py-16 text-center">
                <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-gold/80" />
                <h3 className="font-serif text-3xl">Your bag is empty</h3>
                <p className="mx-auto mt-4 max-w-md text-white/60">
                  Add a product from the collection and we will hold it here for secure checkout.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
