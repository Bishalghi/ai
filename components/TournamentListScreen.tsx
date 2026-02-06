import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { Tournament, TournamentStatus } from '../types';

interface TournamentListScreenProps {
  tournaments: Tournament[];
  onSelect: (t: Tournament) => void;
}

const TournamentListScreen: React.FC<TournamentListScreenProps> = ({ tournaments, onSelect }) => {
  const [activeTab, setActiveTab] = useState<TournamentStatus>('Upcoming');

  const filtered = tournaments.filter(t => t.status === activeTab);

  return (
    <div className="p-5 pb-32 animate-fade-in pt-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Tournaments</h1>
          <p className="text-slate-400 text-sm">Win massive prize pools daily</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
          <Trophy size={24} />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex p-1 bg-slate-800 rounded-2xl mb-6 border border-slate-700">
        {(['Upcoming', 'Live', 'Completed'] as TournamentStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === status ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Tournament List */}
      <div className="space-y-4 overflow-y-auto no-scrollbar flex-1">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
              <Calendar className="text-slate-600" size={32} />
            </div>
            <p className="text-slate-400 font-medium">No tournaments available</p>
          </div>
        ) : (
          filtered.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelect(t)}
              className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden group active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="relative h-32">
                <img src={t.bannerImage} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" alt={t.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                    {t.type}
                  </span>
                  <span className="px-3 py-1 bg-orange-500/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                    {t.gameName}
                  </span>
                </div>
                {t.status === 'Live' && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 bg-red-500 rounded-full">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-white uppercase">Live</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-3">{t.title}</h3>
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <Trophy size={14} className="text-orange-500" />
                      <span className="font-medium text-white">NPR {t.prizePool}</span>
                      <span>Prize Pool</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <Users size={14} className="text-blue-500" />
                      <span className="font-medium text-slate-200">{t.joinedSlots}/{t.totalSlots} Slots</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Entry Fee</div>
                    <div className="text-lg font-black text-white">
                      {t.entryFee === 0 ? 'FREE' : `NPR ${t.entryFee}`}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-400">
                            {t.startTime.toLocaleDateString()} • {t.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <div className="text-orange-500 group-hover:translate-x-1 transition-transform">
                        <ArrowRight size={18} />
                    </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TournamentListScreen;
