import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';

const SpecialOffer: React.FC = () => {
  return (
    <section id="offers" className="py-20 px-4 md:px-0">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 shadow-2xl p-8 md:p-16 text-center md:text-left"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold mb-6 border border-white/20">
                <Sparkles size={16} className="text-yellow-300" /> Launch Offer
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Get <span className="text-yellow-300">50% EXTRA</span> <br/>
                On First Deposit
              </h2>
              <p className="text-white/90 text-xl mb-8 font-medium">
                Load NPR 500 or more on your first transaction and we'll add 50% bonus balance instantly!
              </p>
              <button className="px-10 py-4 bg-white text-red-600 rounded-full font-bold text-lg hover:bg-yellow-50 transition shadow-lg transform hover:-translate-y-1">
                Claim Offer Now
              </button>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <motion.div 
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-48 md:w-64 md:h-64 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30 transform rotate-12"
              >
                <Gift size={100} className="text-white drop-shadow-md" />
              </motion.div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-red-700 w-24 h-24 rounded-full flex items-center justify-center font-black text-xl rotate-12 shadow-lg border-4 border-white">
                50%
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffer;
