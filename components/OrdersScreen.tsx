import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, ArrowUpRight, ArrowDownLeft, Gamepad2 } from 'lucide-react';
import { Transaction } from '../types';

interface OrdersScreenProps {
  transactions: Transaction[];
}

const OrdersScreen: React.FC<OrdersScreenProps> = ({ transactions }) => {
  const [activeTab, setActiveTab] = useState<'topup' | 'wallet'>('topup');

  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === 'topup') return tx.type === 'GAME_TOPUP';
    return tx.type === 'WALLET_LOAD' || tx.type === 'P2P_TRANSFER';
  });

  return (
    <div className="p-5 pb-32 animate-fade-in pt-8 h-full flex flex-col">
      <div className="flex justify-between items-end mb-6">
         <h1 className="text-3xl font-display font-bold text-white">Activity</h1>
         <button className="p-2 bg-slate-800 rounded-lg text-slate-400 border border-slate-700">
             <Search size={20} />
         </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-800 rounded-xl mb-6 border border-slate-700">
        <button 
          onClick={() => setActiveTab('topup')}
          className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'topup' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
        >
          Game Top-Ups
        </button>
        <button 
          onClick={() => setActiveTab('wallet')}
          className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'wallet' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
        >
          Wallet History
        </button>
      </div>
      
      {/* List */}
      <div className="space-y-4 overflow-y-auto pb-4 no-scrollbar flex-1">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-20 text-slate-500 flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
               {activeTab === 'topup' ? <Gamepad2 className="opacity-30" size={32} /> : <ShoppingBag className="opacity-30" size={32} />}
            </div>
            <p className="text-lg font-medium">No records found</p>
            <p className="text-sm opacity-60">
              {activeTab === 'topup' ? "You haven't purchased any games yet." : "No wallet activity yet."}
            </p>
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={tx.id} 
              className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex justify-between items-center group hover:border-slate-600 transition-colors"
            >
               <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 ${
                    tx.type === 'GAME_TOPUP' ? 'bg-slate-700 text-slate-300' :
                    tx.type === 'WALLET_LOAD' ? 'bg-green-500/10 text-green-500' :
                    'bg-orange-500/10 text-orange-500'
                 }`}>
                    {tx.type === 'GAME_TOPUP' && <Gamepad2 size={20} />}
                    {tx.type === 'WALLET_LOAD' && <ArrowDownLeft size={20} />}
                    {tx.type === 'P2P_TRANSFER' && <ArrowUpRight size={20} />}
                 </div>
                 <div>
                   <div className="text-white font-bold text-sm">{tx.title}</div>
                   <div className="text-xs text-slate-400 font-medium mt-0.5">{tx.subtitle}</div>
                   <div className="text-[10px] text-slate-500 mt-0.5">
                     {tx.date.toLocaleDateString()} • {tx.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                   </div>
                 </div>
               </div>
               <div className="text-right">
                 <div className={`font-bold text-sm ${tx.isDebit ? 'text-white' : 'text-green-400'}`}>
                   {tx.isDebit ? '-' : '+'} NPR {tx.amount}
                 </div>
                 <div className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                    tx.status === 'Success' ? 'text-green-500' : 
                    tx.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'
                 }`}>
                   {tx.status}
                 </div>
               </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersScreen;
