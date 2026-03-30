import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Mail, MapPin, Phone } from 'lucide-react';
export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 3000);
  };
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
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
          className="text-center mb-16">
          
          <h1 className="font-serif text-5xl md:text-7xl mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm uppercase tracking-wider mb-2">
                  
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-gold/20 focus:border-gold"
                  placeholder="Your name" />
                
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm uppercase tracking-wider mb-2">
                  
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-gold/20 focus:border-gold"
                  placeholder="your@email.com" />
                
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm uppercase tracking-wider mb-2">
                  
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 bg-secondary border border-gold/20 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground"
                  placeholder="Your message..." />
                
              </div>

              <Button
                type="submit"
                size="lg"
                className={`w-full transition-all duration-300 ${isSubmitted ? 'bg-green-600 hover:bg-green-600' : 'bg-gold text-black hover:bg-gold/90'}`}>
                
                {isSubmitted ? 'Message Sent!' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.4
            }}
            className="space-y-12">
            
            <div>
              <h2 className="font-serif text-3xl mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      123 Fashion Avenue
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">hello@sleek.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-8">
              <h3 className="font-serif text-2xl mb-4">Store Hours</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>11:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl mb-4">Follow Us</h3>
              <p className="text-muted-foreground mb-4">
                Stay connected for the latest collections, exclusive offers, and
                style inspiration.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-gold transition-colors">
                  
                  Instagram
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-gold transition-colors">
                  
                  Facebook
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-gold transition-colors">
                  
                  Twitter
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>);

}