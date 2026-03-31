import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
export function Footer() {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };
  return (
    <footer className="footer-shell bg-black border-t border-gold/10 mt-24">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h3 className="footer-text font-serif text-3xl md:text-4xl mb-4">
            Join the SLEEK Circle
          </h3>
          <p className="footer-text text-muted-foreground mb-6">
            Be the first to know about new collections, exclusive offers, and
            style inspiration.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-secondary border-gold/20 focus:border-gold" />
            
            <Button
              type="submit"
              className="bg-gold text-black hover:bg-gold/90">
              
              Subscribe
            </Button>
          </form>
        </div>

        <Separator className="bg-gold/10 mb-12" />

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="footer-text font-semibold mb-4 tracking-wider uppercase text-sm">
              Shop
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/collections"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  All Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/collections?category=men"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  Men
                </Link>
              </li>
              <li>
                <Link
                  to="/collections?category=women"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  Women
                </Link>
              </li>
              <li>
                <Link
                  to="/collections?category=kids"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  Kids
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-text font-semibold mb-4 tracking-wider uppercase text-sm">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-text font-semibold mb-4 tracking-wider uppercase text-sm">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-text font-semibold mb-4 tracking-wider uppercase text-sm">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-muted-foreground hover:text-gold transition-colors">
                  
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gold/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="footer-text text-muted-foreground text-sm">
            © 2026 SLEEK. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="footer-link text-muted-foreground hover:text-gold transition-colors"
              aria-label="Instagram">
              
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="footer-link text-muted-foreground hover:text-gold transition-colors"
              aria-label="Facebook">
              
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="footer-link text-muted-foreground hover:text-gold transition-colors"
              aria-label="Twitter">
              
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>);

}
