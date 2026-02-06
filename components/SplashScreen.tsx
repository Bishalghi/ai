import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-red-600 via-orange-500 to-orange-400 flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background Decor */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"
      ></motion.div>

      {/* Main Content Container */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo Mark */}
        <motion.div 
          initial={{ rotate: -10, y: 20 }}
          animate={{ rotate: 0, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6"
        >
           <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-orange-500">
             M
           </span>
        </motion.div>

        {/* Brand Name */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-display font-bold tracking-tight mb-2"
        >
          Mero Topup
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-white/80 font-medium text-sm tracking-widest uppercase"
        >
          Game Top-Up Made Easy
        </motion.p>
      </motion.div>

      {/* Loading Indicator */}
      <motion.div 
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 100 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-16 h-1 bg-white/30 rounded-full overflow-hidden"
      >
        <motion.div 
          animate={{ x: [-100, 100] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-full h-full bg-white/80"
        />
      </motion.div>
    </div>
  );
};

export default SplashScreen;
