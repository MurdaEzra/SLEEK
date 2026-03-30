import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, UserRound, LockKeyhole } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { cn } from '../components/ui/utils';
import { useAppContext, type UserRole } from '../context/AppContext';

export function Login() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { login, registerClient } = useAppContext();
  const [role, setRole] = useState<UserRole>((searchParams.get('role') as UserRole) || 'client');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: role === 'admin' ? 'admin@sleekstudio.com' : 'client@sleekstudio.com',
    password: role === 'admin' ? 'Admin@123' : 'Client@123',
    phone: '',
    address: ''
  });

  const redirectTarget = useMemo(() => {
    const fromState = location.state as { from?: string } | null;
    return fromState?.from || (role === 'admin' ? '/admin' : '/profile');
  }, [location.state, role]);

  const handleRoleSwitch = (nextRole: UserRole) => {
    setRole(nextRole);
    setMode('signin');
    setMessage('');
    setForm({
      fullName: '',
      email: nextRole === 'admin' ? 'admin@sleekstudio.com' : 'client@sleekstudio.com',
      password: nextRole === 'admin' ? 'Admin@123' : 'Client@123',
      phone: '',
      address: ''
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const result =
      role === 'client' && mode === 'signup'
        ? await registerClient(form)
        : await login({ email: form.email, password: form.password, role });

    setIsSubmitting(false);
    setMessage(result.message);

    if (result.success) {
      navigate(redirectTarget, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-24">
      <section className="relative overflow-hidden px-4 pb-16 pt-8 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(200,168,78,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_30%)]" />
        <div className="container relative mx-auto grid items-stretch gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2rem] border border-gold/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 lg:p-12"
          >
            <div className="absolute inset-0 bg-[url('/file_00000000b94c71fda2f8c8cac8f59657.png')] bg-cover bg-center opacity-15" />
            <div className="relative max-w-xl">
              <p className="mb-4 text-xs uppercase tracking-[0.5em] text-gold/80">SLEEK Access</p>
              <h1 className="font-serif text-5xl leading-tight md:text-6xl">
                Secure entry for private clients and store administrators.
              </h1>
              <p className="mt-6 max-w-lg text-lg text-white/70">
                Clients need an account to continue to checkout, while administrators unlock
                product control, discount scheduling, and catalog updates from one polished back office.
              </p>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                  <ShieldCheck className="mb-4 h-6 w-6 text-gold" />
                  <h2 className="mb-2 text-lg">Admin access</h2>
                  <p className="text-sm text-white/65">
                    Use the seeded admin account to manage products, prices, and promotional discounts.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                  <Sparkles className="mb-4 h-6 w-6 text-gold" />
                  <h2 className="mb-2 text-lg">Client checkout</h2>
                  <p className="text-sm text-white/65">
                    Sign in or create a client account to move products into a secure checkout flow.
                  </p>
                </div>
              </div>
              <div className="mt-10 space-y-2 text-sm text-white/55">
                <p>Admin demo: `admin@sleekstudio.com` / `Admin@123`</p>
                <p>Client demo: `client@sleekstudio.com` / `Client@123`</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-[2rem] border border-white/10 bg-[#0d0d0d]/95 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <div className="mb-8 flex rounded-full border border-white/10 bg-black/40 p-1">
              {(['client', 'admin'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleRoleSwitch(option)}
                  className={cn(
                    'flex-1 rounded-full px-4 py-3 text-sm uppercase tracking-[0.3em] transition-all',
                    role === option ? 'bg-gold text-black' : 'text-white/65 hover:text-white'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {role === 'client' ? (
              <div className="mb-6 flex gap-3">
                {(['signin', 'signup'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMode(option)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-xs uppercase tracking-[0.35em] transition-colors',
                      mode === option
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 text-white/55 hover:border-gold/40 hover:text-white'
                    )}
                  >
                    {option === 'signin' ? 'Sign In' : 'Create Account'}
                  </button>
                ))}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.35em] text-white/55">
                  {role === 'admin' ? 'Administrator' : 'Client account'}
                </label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                  <Input
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    className="h-12 rounded-2xl border-white/10 bg-white/5 pl-11 text-white"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.35em] text-white/55">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                  <Input
                    type="password"
                    required
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                    className="h-12 rounded-2xl border-white/10 bg-white/5 pl-11 text-white"
                    placeholder="Password"
                  />
                </div>
              </div>

              {role === 'client' && mode === 'signup' ? (
                <>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.35em] text-white/55">
                      Full name
                    </label>
                    <Input
                      required
                      value={form.fullName}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, fullName: event.target.value }))
                      }
                      className="h-12 rounded-2xl border-white/10 bg-white/5 text-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      required
                      value={form.phone}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, phone: event.target.value }))
                      }
                      className="h-12 rounded-2xl border-white/10 bg-white/5 text-white"
                      placeholder="Phone number"
                    />
                    <Input
                      required
                      value={form.address}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, address: event.target.value }))
                      }
                      className="h-12 rounded-2xl border-white/10 bg-white/5 text-white"
                      placeholder="Delivery address"
                    />
                  </div>
                </>
              ) : null}

              {message ? (
                <div className="rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm text-white/80">
                  {message}
                </div>
              ) : null}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="h-12 w-full rounded-2xl bg-gold text-black hover:bg-gold/90"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                    Securing access...
                  </span>
                ) : role === 'client' && mode === 'signup' ? (
                  'Create client account'
                ) : (
                  `Enter ${role === 'admin' ? 'admin' : 'client'} portal`
                )}
              </Button>
            </form>

            <p className="mt-6 text-sm text-white/50">
              Browse the catalog first? <Link to="/collections" className="text-gold">Return to collections</Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
