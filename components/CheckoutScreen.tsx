import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Wallet, ShieldCheck, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Game, Package } from '../types';

interface CheckoutScreenProps {
  game: Game;
  pkg: Package;
  walletBalance: number;
  onBack: () => void;
  onConfirm: (playerId: string, playerName: string) => Promise<void>;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ game, pkg, walletBalance, onBack, onConfirm }) => {
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState(''); // Optional: In a real app, this might be fetched via API
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async () => {
    if (!playerId) {
        setError('Please enter your Player ID');
        return;
    }
    if (walletBalance < pkg.price) {
        setError('Insufficient wallet balance');
        return;
    }
    
    setError('');
    setIsProcessing(true);
    await onConfirm(playerId, playerName || 'Guest Player');
    setIsProcessing(false);
  };

  return (
    <div className="bg-slate-900 min-h-full flex flex-col relative">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">Checkout</h1>
      </div>

      <div className="p-6 flex-1 overflow-y-auto pb-32">
        
        {/* Item Summary */}
        <section className="mb-8">
            <h2 className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">Order Summary</h2>
            <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex gap-4 items-center">
                <img src={game.image} className="w-16 h-16 rounded-xl border border-slate-600" alt={game.name} />
                <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">{game.name}</h3>
                    <p className="text-orange-400 font-medium text-sm">{pkg.name}</p>
                </div>
                <div className="text-right">
                    <div className="text-slate-400 text-xs">Price</div>
                    <div className="text-white font-bold text-lg">NPR {pkg.price}</div>
                </div>
            </div>
        </section>

        {/* Player Details Form */}
        <section className="mb-8">
            <h2 className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">Player Details</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-slate-400 text-xs mb-1.5 ml-1">Player ID / UID</label>
                    <input 
                        type="text" 
                        value={playerId}
                        onChange={(e) => { setPlayerId(e.target.value); setError(''); }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 transition-colors font-medium"
                        placeholder={game.placeholderId}
                    />
                </div>
                <div>
                    <label className="block text-slate-400 text-xs mb-1.5 ml-1">In-Game Name (Optional)</label>
                    <input 
                        type="text" 
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 transition-colors font-medium"
                        placeholder="e.g. ProGamer123"
                    />
                </div>
            </div>
            <div className="mt-3 flex gap-2 items-center px-1">
                <ShieldCheck size={14} className="text-green-500" />
                <p className="text-xs text-slate-500">Details are verified instantly before processing.</p>
            </div>
        </section>

        {/* Payment Method */}
        <section className="mb-6">
            <h2 className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">Payment Method</h2>
            <div className={`p-4 rounded-2xl border transition-all ${walletBalance >= pkg.price ? 'bg-slate-800 border-green-500/50' : 'bg-red-900/10 border-red-500/50'}`}>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <Wallet className={walletBalance >= pkg.price ? "text-green-400" : "text-red-400"} size={20} />
                        <span className="text-white font-bold">Mero Wallet</span>
                    </div>
                    {walletBalance >= pkg.price ? (
                         <CheckCircle2 className="text-green-500" size={20} />
                    ) : (
                         <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">Low Balance</span>
                    )}
                </div>
                <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm">Available Balance</span>
                    <span className={`text-xl font-bold ${walletBalance >= pkg.price ? 'text-white' : 'text-red-400'}`}>
                        NPR {walletBalance.toLocaleString()}
                    </span>
                </div>
            </div>
        </section>

        {/* Error Display */}
        <AnimatePresence>
            {error && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-3 mb-6"
                >
                    <AlertCircle className="text-red-500 shrink-0" size={20} />
                    <span className="text-red-400 text-sm font-medium">{error}</span>
                </motion.div>
            )}
        </AnimatePresence>

      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 p-4 pb-safe z-50">
         <div className="flex justify-between items-center mb-4 px-1">
             <span className="text-slate-400 text-sm">Total to Pay</span>
             <span className="text-2xl font-bold text-white">NPR {pkg.price}</span>
         </div>
         <button 
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
         >
            {isProcessing ? (
                <>
                    <Loader2 className="animate-spin" size={20} /> Processing...
                </>
            ) : (
                <>
                    Confirm Payment
                </>
            )}
         </button>
      </div>
    </div>
  );
};

export default CheckoutScreen;