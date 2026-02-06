import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Wallet, X, ArrowUpRight, Plus, CreditCard, Banknote } from 'lucide-react';

interface WalletScreenProps {
  balance: number;
  onLoadFunds: (amount: number, method: string) => void;
}

const WalletScreen: React.FC<WalletScreenProps> = ({ balance, onLoadFunds }) => {
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');

  const handleLoad = () => {
    if (!amount || !selectedMethod) return;
    onLoadFunds(Number(amount), selectedMethod);
    setShowLoadModal(false);
    setAmount('');
    setSelectedMethod('');
  };

  return (
    <div className="p-5 pb-32 space-y-8 animate-fade-in pt-8 h-full flex flex-col relative">
      <h1 className="text-3xl font-display font-bold text-white">My Wallet</h1>
      
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[2rem] border border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-widest">Available Balance</p>
          <h2 className="text-5xl font-bold text-white tracking-tight mb-8">NPR {balance.toLocaleString()}</h2>
          
          <div className="grid grid-cols-2 gap-4 w-full">
              <button 
                onClick={() => setShowLoadModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                  <Plus size={18} /> Load Money
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                  <ArrowUpRight size={18} /> Withdraw
              </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="flex-1">
          <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide ml-1">Payment Methods</h3>
          <div className="grid grid-cols-2 gap-3">
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 opacity-75">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mb-2">E</div>
                <div className="text-white font-bold text-sm">eSewa</div>
                <div className="text-[10px] text-slate-400">Linked • 98XXXXXX</div>
             </div>
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 opacity-75">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-2">K</div>
                <div className="text-white font-bold text-sm">Khalti</div>
                <div className="text-[10px] text-slate-400">Linked • 98XXXXXX</div>
             </div>
             <div className="col-span-2 border border-dashed border-slate-700 rounded-xl p-4 flex items-center justify-center gap-2 text-slate-500 hover:bg-slate-800 transition cursor-pointer">
                 <Plus size={16} /> <span className="text-xs font-bold">Add New Method</span>
             </div>
          </div>
      </div>

      {/* Load Money Modal */}
      <AnimatePresence>
        {showLoadModal && (
          <div className="absolute inset-0 z-50 flex items-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoadModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full bg-slate-900 rounded-t-[2rem] p-6 border-t border-slate-700 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Load Money</h3>
                <button onClick={() => setShowLoadModal(false)} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase mb-3 block">Select Method</label>
                  <div className="space-y-3">
                    {['eSewa', 'Khalti', 'Mobile Banking'].map((method) => (
                      <button
                        key={method}
                        onClick={() => setSelectedMethod(method)}
                        className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${
                          selectedMethod === method 
                          ? 'bg-orange-500/10 border-orange-500' 
                          : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${method === 'eSewa' ? 'bg-green-600' : method === 'Khalti' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                           {method[0]}
                         </div>
                         <span className={`font-bold ${selectedMethod === method ? 'text-orange-500' : 'text-white'}`}>{method}</span>
                         {selectedMethod === method && <div className="ml-auto w-3 h-3 bg-orange-500 rounded-full" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                   <label className="text-xs text-slate-400 font-bold uppercase mb-2 block">Amount (NPR)</label>
                   <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 1000"
                      className="w-full bg-slate-800 text-white text-2xl font-bold px-4 py-4 rounded-xl border border-slate-700 focus:border-orange-500 focus:outline-none"
                   />
                </div>

                <button 
                  disabled={!amount || !selectedMethod}
                  onClick={handleLoad}
                  className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition"
                >
                  Proceed to Payment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WalletScreen;
