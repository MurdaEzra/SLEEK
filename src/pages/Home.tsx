import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';
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
export function Home() {
  const collections = [
  {
    title: 'Women',
    image: "/IMG_20251225_201231_401.png",

    link: '/collections?category=women'
  },
  {
    title: 'Men',
    image: "/file_00000000b94c71fda2f8c8cac8f59657.png",

    link: '/collections?category=men'
  },
  {
    title: 'Kids',
    image: "/PSX_20251229_172911.png",

    link: '/collections?category=kids'
  }];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/file_00000000b94c71fda2f8c8cac8f59657.png"
            alt="Hero"
            className="w-full h-full object-cover object-[center_7%]" />
          
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            delay: 0.3
          }}
          className="relative z-10 text-center px-4">
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight">
            Redefining Modern Elegance
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Where luxury meets streetwear. Discover the SLEEK collection.
          </p>
          <Link to="/collections">
            <Button
              size="lg"
              className="bg-gold text-black hover:bg-gold/90 text-base px-8">
              
              Explore Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-6xl mb-4">
              Featured Collections
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Curated pieces that define contemporary luxury
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) =>
          <FadeInSection key={collection.title}>
              <Link to={collection.link} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-3xl mb-2">
                      {collection.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-gold" />
                  </div>
                </div>
              </Link>
            </FadeInSection>
          )}
        </div>
      </section>

      {/* Editorial Section */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight">
                Crafted for the Modern Individual
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Each piece in the SLEEK collection represents a commitment to
                exceptional quality, timeless design, and the pursuit of
                perfection. We believe that true luxury lies in the details.
              </p>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold hover:text-black">
                  
                  Our Story
                </Button>
              </Link>
            </div>
            <div className="relative aspect-square">
              <img
                src="/file_00000000b0c871fd9292ceb23a596d7b.png"
                alt="Editorial"
                className="w-full h-full object-cover" />
              
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <FadeInSection>
          <div className="bg-secondary p-12 md:p-20 text-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Experience SLEEK
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Visit our flagship store or explore our complete collection online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/collections">
                <Button
                  size="lg"
                  className="bg-gold text-black hover:bg-gold/90">
                  
                  Shop Now
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
      </section>
    </div>);

}
