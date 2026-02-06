import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Gamepad2, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    title: "Game Top-Up Instantly",
    description: "Top up Free Fire Diamonds, PUBG UC, and more directly to your player ID in seconds.",
    icon: Gamepad2,
    color: "text-brand-primary"
  },
  {
    id: 2,
    title: "Secure Wallet Payments",
    description: "Your money is safe. Pay easily using eSewa, Khalti, or Mobile Banking with bank-grade security.",
    icon: ShieldCheck,
    color: "text-green-400"
  },
  {
    id: 3,
    title: "Fast & Reliable Delivery",
    description: "Experience lightning-fast processing. We ensure your game credits arrive immediately.",
    icon: Zap,
    color: "text-yellow-400"
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl"></div>
      
      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        <button onClick={onComplete} className="text-slate-400 text-sm font-bold hover:text-white transition-colors">SKIP</button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 relative z-10 mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <div className={`w-40 h-40 rounded-[2rem] bg-slate-800 border border-slate-700 flex items-center justify-center mb-10 shadow-2xl shadow-black/50 ${slides[currentIndex].color} relative`}>
              {/* Inner Glow */}
              <div className={`absolute inset-0 opacity-20 blur-xl ${slides[currentIndex].color.replace('text', 'bg')}`}></div>
              {React.createElement(slides[currentIndex].icon, { size: 72 })}
            </div>
            
            <h2 className="text-3xl font-display font-bold text-white mb-4 leading-tight">
              {slides[currentIndex].title}
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              {slides[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="p-8 pb-12">
        <div className="flex justify-between items-center">
          {/* Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-brand-primary' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Next / Get Started Button */}
          <button 
            onClick={handleNext}
            className={`h-14 px-6 rounded-full flex items-center justify-center text-slate-900 font-bold shadow-lg transition-all ${
                currentIndex === slides.length - 1 
                ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white w-auto px-8' 
                : 'bg-white w-14 hover:scale-105 active:scale-95'
            }`}
          >
            {currentIndex === slides.length - 1 ? (
                <span className="flex items-center gap-2">Get Started <ArrowRight size={18} /></span>
            ) : (
                <ChevronRight size={24} strokeWidth={3} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
