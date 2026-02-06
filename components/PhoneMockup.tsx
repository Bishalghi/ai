import React from 'react';
import { Wallet, QrCode, Bell, User, Send, CreditCard, Smartphone, Zap, Gift, History } from 'lucide-react';
import { motion } from 'framer-motion';

const PhoneMockup: React.FC = () => {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      
      {/* Screen Content */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-50 relative flex flex-col">
        
        {/* Header */}
        <div className="pt-8 pb-4 px-5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-b-3xl shadow-md z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <User size={16} />
              </div>
              <div className="text-sm font-medium">Namaste, User</div>
            </div>
            <Bell size={20} className="text-white/90" />
          </div>
          
          <div className="mb-2 text-white/80 text-xs">Total Balance</div>
          <div className="text-3xl font-bold mb-4">NPR 4,250.00</div>
          
          <div className="flex justify-between gap-2 mt-2">
            <button className="flex-1 bg-white/20 backdrop-blur-md py-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 hover:bg-white/30 transition">
                <Wallet size={16} /> Add
            </button>
            <button className="flex-1 bg-white/20 backdrop-blur-md py-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 hover:bg-white/30 transition">
                <Send size={16} /> Send
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar">
          
          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-4 mb-6">
             {[
               { icon: Smartphone, label: "Topup", color: "bg-blue-100 text-blue-600" },
               { icon: Zap, label: "Electricity", color: "bg-yellow-100 text-yellow-600" },
               { icon: CreditCard, label: "Khanepani", color: "bg-cyan-100 text-cyan-600" },
               { icon: QrCode, label: "Scan", color: "bg-purple-100 text-purple-600" }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center gap-2">
                 <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shadow-sm`}>
                   <item.icon size={20} />
                 </div>
                 <span className="text-[10px] text-slate-600 font-medium">{item.label}</span>
               </div>
             ))}
          </div>

          {/* Banner */}
          <motion.div 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-full h-24 rounded-2xl bg-gradient-to-r from-brand-purple to-indigo-500 mb-6 p-4 flex items-center justify-between shadow-lg text-white"
          >
             <div>
                <div className="text-xs font-bold opacity-80 mb-1">CASHBACK OFFER</div>
                <div className="text-lg font-bold">Get 5% OFF</div>
                <div className="text-[10px] opacity-80">On Internet Bills</div>
             </div>
             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Gift size={20} />
             </div>
          </motion.div>

          {/* Recent Transactions */}
          <div className="mb-2">
             <div className="flex justify-between items-end mb-3">
                 <h3 className="font-bold text-slate-800 text-sm">Recent Activity</h3>
                 <span className="text-xs text-brand-orange font-medium">View All</span>
             </div>
             {[1, 2, 3].map((_, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl mb-2 shadow-sm border border-slate-100">
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                             <CreditCard size={14} className="text-slate-500" />
                         </div>
                         <div>
                             <div className="text-xs font-bold text-slate-800">Internet Bill</div>
                             <div className="text-[10px] text-slate-400">Today, 10:23 AM</div>
                         </div>
                     </div>
                     <div className="text-xs font-bold text-red-500">- NPR 500</div>
                 </div>
             ))}
          </div>
        </div>
        
        {/* Tab Bar */}
        <div className="h-16 bg-white border-t border-slate-100 flex justify-around items-center px-2">
            <div className="flex flex-col items-center gap-1 text-brand-red">
                <Wallet size={20} />
                <span className="text-[10px] font-medium">Home</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-400">
                <History size={20} />
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-orange -mt-8 flex items-center justify-center shadow-lg shadow-orange-200 text-white border-4 border-slate-50">
                <QrCode size={24} />
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-400">
                <Gift size={20} />
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-400">
                <User size={20} />
            </div>
        </div>

      </div>
    </div>
  );
};

export default PhoneMockup;