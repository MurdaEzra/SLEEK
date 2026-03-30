import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, PackageCheck, Percent, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAppContext } from '../context/AppContext';

export function AdminProfile() {
  const { currentUser, products } = useAppContext();

  if (!currentUser) {
    return null;
  }

  const discountedCount = products.filter((product) => product.discountPercent).length;

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(200,168,78,0.16),rgba(255,255,255,0.04))]">
          <div className="grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold/80">Admin profile</p>
              <h1 className="font-serif text-5xl">{currentUser.fullName}</h1>
              <p className="mt-4 max-w-md text-white/65">
                Catalog authority for SLEEK. Manage product drops, edit pricing, and launch discounts from one controlled dashboard.
              </p>
              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <div className="mb-2 flex items-center gap-2 text-gold">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.3em]">Secure level</span>
                </div>
                <p className="text-white/75">Administrator access verified</p>
                <p className="mt-2 text-sm text-white/55">{currentUser.email}</p>
              </div>
              <Link to="/admin" className="mt-8 inline-block">
                <Button size="lg" className="h-12 rounded-2xl bg-gold px-8 text-black hover:bg-gold/90">
                  Open control center
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                <PackageCheck className="mb-4 h-7 w-7 text-gold" />
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Live products</p>
                <h2 className="mt-3 text-4xl">{products.length}</h2>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                <Percent className="mb-4 h-7 w-7 text-gold" />
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Discounted</p>
                <h2 className="mt-3 text-4xl">{discountedCount}</h2>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                <BarChart3 className="mb-4 h-7 w-7 text-gold" />
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Status</p>
                <h2 className="mt-3 text-xl">Showroom live</h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
