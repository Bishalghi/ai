import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, CreditCard, LogOut, ChevronRight, Settings, HelpCircle, FileText } from 'lucide-react';

interface ProfileScreenProps {
  user: any;
  balance: number;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, balance, onLogout }) => {
  return (
    <div className="p-5 pb-32 pt-24 animate-fade-in min-h-full bg-slate-900">
       {/* Header Profile */}
       <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-28 h-28 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-5xl text-white font-bold border-[6px] border-slate-800 shadow-2xl mb-4 relative">
             {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
             <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-800"></div>
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-1">{user?.name || "Pro Gamer"}</h2>
          <p className="text-slate-400 font-medium bg-slate-800 px-3 py-1 rounded-full text-xs">{user?.email || "user@example.com"}</p>
       </div>

       {/* Stats */}
       <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
             <p className="text-xs text-slate-400 font-bold uppercase mb-1">Total Balance</p>
             <p className="text-xl font-bold text-white">NPR {balance.toLocaleString()}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
             <p className="text-xs text-slate-400 font-bold uppercase mb-1">Status</p>
             <p className="text-xl font-bold text-orange-500">Verified</p>
          </div>
       </div>

       {/* Menu Items */}
       <div className="space-y-3 mb-8">
          <button className="w-full bg-slate-800 p-4 rounded-xl flex items-center justify-between group hover:bg-slate-700 transition">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                   <User size={20} />
                </div>
                <span className="font-bold text-white">Edit Profile</span>
             </div>
             <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />
          </button>

          <button className="w-full bg-slate-800 p-4 rounded-xl flex items-center justify-between group hover:bg-slate-700 transition">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                   <ShieldCheck size={20} />
                </div>
                <span className="font-bold text-white">Security & Password</span>
             </div>
             <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />
          </button>

          <button className="w-full bg-slate-800 p-4 rounded-xl flex items-center justify-between group hover:bg-slate-700 transition">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center">
                   <CreditCard size={20} />
                </div>
                <span className="font-bold text-white">Saved Payment Methods</span>
             </div>
             <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />
          </button>

          <button className="w-full bg-slate-800 p-4 rounded-xl flex items-center justify-between group hover:bg-slate-700 transition">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                   <HelpCircle size={20} />
                </div>
                <span className="font-bold text-white">Help & Support</span>
             </div>
             <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />
          </button>
       </div>

       {/* Logout */}
       <button onClick={onLogout} className="w-full p-4 border border-red-500/20 bg-red-500/5 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 transition mb-6">
          <LogOut size={20} /> Log Out
       </button>

       <p className="text-center text-slate-600 text-xs font-medium">App Version 1.0.0 (Beta)</p>
    </div>
  );
};

export default ProfileScreen;
