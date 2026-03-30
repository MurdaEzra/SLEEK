import React from 'react';
import { motion } from 'framer-motion';

export function BootLoader() {
  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(200,168,78,0.24),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.03),_transparent_45%)]" />
      <div className="relative flex h-full items-center justify-center px-6">
        <div className="w-full max-w-md rounded-[2rem] border border-gold/15 bg-white/5 p-10 text-center backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-gold/20 bg-black/60"
          >
            <img src="/LOGO.png" alt="SLEEK" className="h-14 w-auto" />
          </motion.div>
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-gold/75">Private Access</p>
          <h1 className="font-serif text-4xl text-white">Preparing the showroom</h1>
          <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="h-full w-1/2 bg-[linear-gradient(90deg,transparent,rgba(200,168,78,0.95),transparent)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
