import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, ShoppingBag, SunMedium, UserCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useAppContext } from '../context/AppContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { currentUser, cart, logout, theme, toggleTheme } = useAppContext();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Collections', path: '/collections' },
      { name: 'Men', path: '/collections?category=men' },
      { name: 'Women', path: '/collections?category=women' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ],
    []
  );

  const accountLink =
    currentUser?.role === 'admin'
      ? { label: 'Admin', path: '/admin/profile' }
      : currentUser?.role === 'client'
      ? { label: 'Profile', path: '/profile' }
      : { label: 'Login', path: '/auth' };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome ? 'border-b border-gold/10 bg-background/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/LOGO.png" alt="SLEEK" className="h-12 w-auto" />
          </Link>

          <div className="hidden items-center space-x-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm uppercase tracking-wider transition-colors duration-300 hover:text-gold"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="hidden items-center gap-2 rounded-full border border-gold/20 bg-background/70 px-3 py-2 text-sm transition-colors duration-300 hover:border-gold hover:text-gold md:flex"
            >
              {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <Link
              to={currentUser?.role === 'client' ? '/profile' : '/auth?role=client'}
              className="relative p-2 transition-colors duration-300 hover:text-gold"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-5 w-5" />
              {cart.length ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-black">
                  {cart.length}
                </span>
              ) : null}
            </Link>
            <Link
              to={accountLink.path}
              className="hidden items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm transition-colors duration-300 hover:border-gold hover:text-gold md:flex"
            >
              <UserCircle2 className="h-4 w-4" />
              <span>{accountLink.label}</span>
            </Link>
            {currentUser ? (
              <button
                type="button"
                onClick={logout}
                className="hidden text-sm uppercase tracking-[0.3em] text-white/55 transition-colors hover:text-gold xl:block"
              >
                Logout
              </button>
            ) : null}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button className="p-2" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] border-l border-gold/10 bg-black">
                <div className="mt-12 flex flex-col space-y-6">
                  <button
                    type="button"
                    onClick={() => {
                      toggleTheme();
                      setIsOpen(false);
                    }}
                    className="text-left text-lg uppercase tracking-wider transition-colors duration-300 hover:text-gold"
                  >
                    {theme === 'dark' ? 'Switch to Beige' : 'Switch to Dark'}
                  </button>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-lg uppercase tracking-wider transition-colors duration-300 hover:text-gold"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    to={accountLink.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg uppercase tracking-wider transition-colors duration-300 hover:text-gold"
                  >
                    {accountLink.label}
                  </Link>
                  {currentUser ? (
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="text-left text-lg uppercase tracking-wider text-white/60 transition-colors duration-300 hover:text-gold"
                    >
                      Logout
                    </button>
                  ) : null}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
