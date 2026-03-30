import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
function FadeInSection({ children }: {children: React.ReactNode;}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3
  });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 50
      }}
      animate={
      isInView ?
      {
        opacity: 1,
        y: 0
      } :
      {
        opacity: 0,
        y: 50
      }
      }
      transition={{
        duration: 0.8,
        ease: 'easeOut'
      }}>
      
      {children}
    </motion.div>);

}
export function About() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
          className="text-center mb-24">
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6">
            The SLEEK Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Where luxury meets streetwear. A brand built on the principles of
            exceptional craftsmanship, timeless design, and modern elegance.
          </p>
        </motion.div>

        {/* Brand Philosophy */}
        <FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative aspect-square">
              <img
                src="/IMG_20251225_201231_401.png"
                alt="Brand Philosophy"
                className="w-full h-full object-cover" />
              
            </div>
            <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">
                Our Philosophy
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-6" />
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                SLEEK was born from a vision to redefine modern luxury. We
                believe that true elegance lies in the perfect balance between
                sophistication and comfort, between timeless design and
                contemporary style.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every piece in our collection is thoughtfully designed to
                empower individuals to express their unique style while
                maintaining the highest standards of quality and craftsmanship.
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Craftsmanship */}
        <FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">
                Craftsmanship
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-6" />
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We partner with the finest manufacturers who share our
                commitment to excellence. Each garment undergoes rigorous
                quality control to ensure it meets our exacting standards.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                From the selection of premium fabrics to the precision of every
                stitch, we obsess over the details that make our pieces
                exceptional.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Premium materials sourced globally
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Meticulous attention to detail
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Sustainable production practices
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Limited production runs
                </li>
              </ul>
            </div>
            <div className="relative aspect-square order-1 lg:order-2">
              <img
                src="/file_00000000b94c71fda2f8c8cac8f59657.png"
                alt="Craftsmanship"
                className="w-full h-full object-cover" />
              
            </div>
          </div>
        </FadeInSection>

        {/* Vision */}
        <FadeInSection>
          <div className="text-center max-w-4xl mx-auto mb-32">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
              The SLEEK Vision
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We envision a world where luxury is accessible, where quality is
              paramount, and where style is a form of self-expression. SLEEK is
              more than a brand—it's a movement towards conscious consumption
              and timeless elegance.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join us in redefining what it means to dress with purpose,
              confidence, and sophistication.
            </p>
          </div>
        </FadeInSection>

        {/* Image Grid */}
        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="relative aspect-[4/5]">
              <img
                src="/file_00000000b0c871fd9292ceb23a596d7b.png"
                alt="SLEEK Collection"
                className="w-full h-full object-cover" />
              
            </div>
            <div className="relative aspect-[4/5]">
              <img
                src="/PSX_20251229_172911.png"
                alt="SLEEK Collection"
                className="w-full h-full object-cover" />
              
            </div>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center bg-secondary p-12 md:p-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Experience SLEEK
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Discover our complete collection and find pieces that speak to
              your style
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/collections">
                <Button
                  size="lg"
                  className="bg-gold text-black hover:bg-gold/90">
                  
                  Shop Collection
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold hover:text-black">
                  
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>);

}