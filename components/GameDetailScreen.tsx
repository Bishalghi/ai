import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingCart, Info } from 'lucide-react';
import { Game, Package } from '../types';

interface GameDetailScreenProps {
  game: Game;
  onBack: () => void;
  onSelectPackage: (pkg: Package) => void;
}

const GameDetailScreen: React.FC<GameDetailScreenProps> = ({ game, onBack, onSelectPackage }) => {
  return (
    <div className="pb-24 bg-slate-900 min-h-full relative overflow-x-hidden">
      {/* Parallax Header Image */}
      <div className="relative h-72 w-full">
        <img src={game.coverImage} className="w-full h-full object-cover" alt="Cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900"></div>
        
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20">
          <button 
            onClick={onBack} 
            className="w-10 h-10 rounded-full bg-slate-900/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-slate-800 transition"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Game Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-20">
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-end gap-5"
            >
                <motion.img 
                    layoutId={`game-icon-${game.id}`}
                    src={game.image} 
                    className="w-24 h-24 rounded-3xl border-4 border-slate-900 shadow-2xl bg-slate-800" 
                    alt="Icon" 
                />
                <div className="mb-2">
                    <h1 className="text-3xl font-bold text-white leading-none mb-2">{game.name}</h1>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-wide">
                            {game.publisher}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-green-900/30 border border-green-500/30 text-[10px] font-bold text-green-400 uppercase tracking-wide">
                            Instant
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>

      <div className="px-6 mt-6 relative z-10">
        
        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-8 flex gap-3">
            <Info className="text-blue-400 shrink-0" size={20} />
            <p className="text-sm text-blue-200/80 leading-relaxed">
                Select a package below. You will be asked to enter your <strong>{game.placeholderId}</strong> on the next screen.
            </p>
        </div>

        {/* Packages List */}
        <div className="flex justify-between items-end mb-4">
            <h3 className="text-white font-bold text-lg">Top-Up Packages</h3>
            <span className="text-xs text-slate-500">{game.packages.length} items available</span>
        </div>
        
        <div className="space-y-3">
          {game.packages.map((pkg, index) => (
            <motion.div 
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex items-center justify-between group hover:border-orange-500/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center relative">
                    {/* Simulated Item Icon */}
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border-2 border-orange-500"></div>
                    {pkg.bonus && (
                         <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                             +{pkg.bonus}
                         </div>
                    )}
                </div>
                <div>
                    <h4 className="text-white font-bold text-base">{pkg.name}</h4>
                    <p className="text-slate-400 text-xs font-medium">{pkg.currency}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                 <span className="text-white font-bold text-lg">NPR {pkg.price}</span>
                 <button 
                    onClick={() => onSelectPackage(pkg)}
                    className="bg-white text-slate-900 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-500 hover:text-white transition-colors flex items-center gap-1"
                 >
                    Buy Now <ShoppingCart size={12} />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameDetailScreen;
