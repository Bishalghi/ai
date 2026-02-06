import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Camera, CreditCard, Send, User, X, Loader2, CheckCircle2 } from 'lucide-react';

interface ScanScreenProps {
  balance: number;
  onSendMoney: (receiverId: string, amount: number) => Promise<void>;
}

const ScanScreen: React.FC<ScanScreenProps> = ({ balance, onSendMoney }) => {
  const [showSendModal, setShowSendModal] = useState(false);
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!receiverId || !amount) return;
    if (Number(amount) > balance) {
        alert("Insufficient balance!");
        return;
    }

    setLoading(true);
    await onSendMoney(receiverId, Number(amount));
    setLoading(false);
    setShowSendModal(false);
    setReceiverId('');
    setAmount('');
  };

  return (
    <div className="h-full relative bg-black flex flex-col">
      {/* Fake Camera Feed */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
           className="w-full h-full object-cover opacity-40 grayscale" 
           alt="Camera" 
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>
      
      {/* Scanner Overlay */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-white font-bold text-lg mb-8 bg-black/40 px-4 py-1 rounded-full backdrop-blur-md">Scan QR to Pay</h2>
        
        <div className="w-64 h-64 border-2 border-white/20 rounded-3xl relative flex items-center justify-center overflow-hidden bg-white/5 backdrop-blur-sm shadow-2xl">
          {/* Corner Markers */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-orange-500 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-orange-500 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-orange-500 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-orange-500 rounded-br-3xl"></div>
          
          <motion.div 
            animate={{ y: [-100, 100, -100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-0.5 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
          />
        </div>
        
        <div className="mt-8 flex items-center gap-2">
           <div className="bg-slate-800/80 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-xs font-bold text-white">Scanner Active</span>
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 p-8 pb-32 flex justify-center gap-8">
        <button className="flex flex-col items-center gap-2 group">
             <div className="w-14 h-14 rounded-full bg-slate-800/80 backdrop-blur flex items-center justify-center text-white border border-white/10 group-active:scale-95 transition">
                <Zap size={22} />
             </div>
             <span className="text-[10px] font-bold text-slate-300">Flash</span>
        </button>
        
        <button onClick={() => setShowSendModal(true)} className="flex flex-col items-center gap-2 group">
             <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-lg shadow-white/20 transform group-active:scale-95 transition">
                <Send size={26} className="ml-1" />
             </div>
             <span className="text-[10px] font-bold text-white">Send Money</span>
        </button>

        <button className="flex flex-col items-center gap-2 group">
             <div className="w-14 h-14 rounded-full bg-slate-800/80 backdrop-blur flex items-center justify-center text-white border border-white/10 group-active:scale-95 transition">
                <CreditCard size={22} />
             </div>
             <span className="text-[10px] font-bold text-slate-300">My QR</span>
        </button>
      </div>

      {/* Send Money Modal */}
      <AnimatePresence>
        {showSendModal && (
          <div className="absolute inset-0 z-50 flex items-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSendModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full bg-slate-900 rounded-t-[2rem] p-6 border-t border-slate-700 shadow-2xl h-[80%]"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-xl font-bold text-white">Send Money</h3>
                   <p className="text-xs text-slate-400">Transfer funds to another user instantly.</p>
                </div>
                <button onClick={() => setShowSendModal(false)} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-6">
                 {/* ID Input */}
                 <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <label className="text-xs text-slate-400 font-bold uppercase mb-2 block">Receiver ID / Mobile</label>
                    <div className="flex items-center gap-3">
                       <User className="text-orange-500" size={20} />
                       <input 
                          type="text" 
                          value={receiverId}
                          onChange={(e) => setReceiverId(e.target.value)}
                          placeholder="e.g. 9812345678"
                          className="bg-transparent w-full text-white font-bold focus:outline-none"
                       />
                    </div>
                 </div>

                 {/* Amount Input */}
                 <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <label className="text-xs text-slate-400 font-bold uppercase mb-2 block">Amount (NPR)</label>
                    <div className="flex items-center gap-3">
                       <span className="text-2xl font-bold text-orange-500">NPR</span>
                       <input 
                          type="number" 
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                          className="bg-transparent w-full text-white text-3xl font-bold focus:outline-none"
                       />
                    </div>
                 </div>

                 {/* Balance Info */}
                 <div className="flex justify-between items-center px-2">
                    <span className="text-slate-400 text-sm">Available Balance</span>
                    <span className="text-white font-bold">NPR {balance.toLocaleString()}</span>
                 </div>

                 <div className="flex-1"></div>

                 <button 
                  disabled={!amount || !receiverId || loading}
                  onClick={handleSend}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Confirm Transfer'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScanScreen;
