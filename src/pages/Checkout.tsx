import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAppContext } from '../context/AppContext';
import { getDiscountedPrice } from '../lib/products';

export function Checkout() {
  const navigate = useNavigate();
  const { currentUser, cart, products } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const orderRows = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          return product ? { item, product } : null;
        })
        .filter(Boolean) as Array<{
        item: (typeof cart)[number];
        product: (typeof products)[number];
      }>,
    [cart, products]
  );

  const total = orderRows.reduce(
    (sum, row) => sum + getDiscountedPrice(row.product) * row.item.quantity,
    0
  );

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setMessage('');
    await new Promise((resolve) => window.setTimeout(resolve, 1700));
    setIsProcessing(false);
    setMessage('Order approved. A concierge confirmation has been prepared for your account.');
    window.setTimeout(() => navigate('/profile'), 1200);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <form
            onSubmit={handleCheckout}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
          >
            <p className="mb-2 text-xs uppercase tracking-[0.4em] text-gold/80">Secure checkout</p>
            <h1 className="mb-8 font-serif text-5xl">Complete your order</h1>
            <div className="grid gap-4 md:grid-cols-2">
              <Input defaultValue={currentUser.fullName} className="h-12 rounded-2xl border-white/10 bg-white/5 text-white" />
              <Input defaultValue={currentUser.email} className="h-12 rounded-2xl border-white/10 bg-white/5 text-white" />
              <Input defaultValue={currentUser.phone} className="h-12 rounded-2xl border-white/10 bg-white/5 text-white" />
              <Input defaultValue={currentUser.address} className="h-12 rounded-2xl border-white/10 bg-white/5 text-white" />
              <Input placeholder="Card number" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white md:col-span-2" />
              <Input placeholder="Expiry date" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white" />
              <Input placeholder="Security code" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white" />
            </div>
            {message ? (
              <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm text-white/80">
                {message}
              </div>
            ) : null}
            <Button
              type="submit"
              size="lg"
              disabled={isProcessing || !orderRows.length}
              className="mt-8 h-12 rounded-2xl bg-gold px-8 text-black hover:bg-gold/90"
            >
              {isProcessing ? (
                <span className="flex items-center gap-3">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black" />
                  Processing payment...
                </span>
              ) : (
                `Pay $${total.toFixed(2)}`
              )}
            </Button>
          </form>

          <aside className="rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(200,168,78,0.12),rgba(255,255,255,0.03))] p-8">
            <p className="mb-2 text-xs uppercase tracking-[0.4em] text-gold/80">Order summary</p>
            <h2 className="mb-8 font-serif text-4xl">Reserved for you</h2>
            <div className="space-y-4">
              {orderRows.map(({ item, product }) => (
                <div key={`${item.productId}-${item.size}`} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="h-20 w-20 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <h3>{product.name}</h3>
                      <p className="mt-1 text-sm text-white/55">Size {item.size} • Qty {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gold">
                      ${(getDiscountedPrice(product) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <div className="mb-3 flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="mb-3 flex justify-between text-white/60">
                <span>Delivery</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-gold">${total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
