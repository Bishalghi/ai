import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Trophy, Users, ShieldCheck, Map, Clock, Info, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Tournament } from '../types';

interface TournamentDetailScreenProps {
  tournament: Tournament;
  balance: number;
  onBack: () => void;
  onJoin: (inGameId: string) => Promise<void>;
}

const TournamentDetailScreen: React.FC<TournamentDetailScreenProps> = ({ tournament, balance, onBack, onJoin }) => {
  const [inGameId, setInGameId] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleJoin = async () => {
    if (!inGameId) return;
    setIsJoining(true);
    try {
      await onJoin(inGameId);
      setShowConfirm(false);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsJoining(false);
    }
  };

  const isLowBalance = balance < tournament.entryFee;

  return (
    <div className="bg-slate-900 min-h-full relative overflow-x-hidden flex flex-col">
      {/* Header Banner */}
      <div className="relative h-64 w-full">
        <img src={tournament.bannerImage} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900"></div>
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-slate-900/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="px-6 -mt-12 relative z-10 flex-1 flex flex-col pb-32">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl mb-6"
        >
          <h1 className="text-2xl font-bold text-white mb-2">{tournament.title}</h1>
          <div className="flex gap-4 items-center">
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-[10px] font-bold border border-orange-500/30 uppercase">
              {tournament.gameName}
            </span>
            <div className="h-1 w-1 bg-slate-600 rounded-full"></div>
            <span className="text-slate-400 text-xs font-medium">{tournament.type} • {tournament.map}</span>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Prize Pool</div>
                <div className="flex items-center gap-2">
                    <Trophy className="text-orange-500" size={18} />
                    <span className="text-xl font-bold text-white">NPR {tournament.prizePool}</span>
                </div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Entry Fee</div>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="text-green-500" size={18} />
                    <span className="text-xl font-bold text-white">{tournament.entryFee === 0 ? 'FREE' : `NPR ${tournament.entryFee}`}</span>
                </div>
            </div>
        </div>

        {/* Info Blocks */}
        <div className="space-y-6 flex-1">
            <section>
                <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Info size={16} className="text-blue-500" /> Match Information
                </h3>
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs">Start Time</span>
                        <span className="text-white text-xs font-bold">{tournament.startTime.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs">Slots Left</span>
                        <div className="flex items-center gap-2">
                            <span className="text-orange-500 text-xs font-bold">{tournament.totalSlots - tournament.joinedSlots} available</span>
                            <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-orange-500" 
                                    style={{ width: `${(tournament.joinedSlots / tournament.totalSlots) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck size={16} className="text-orange-500" /> Tournament Rules
                </h3>
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-3">
                    {tournament.rules.map((rule, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5" />
                            <p className="text-slate-400 text-xs leading-relaxed">{rule}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 p-4 pb-safe z-50">
         <button 
            onClick={() => setShowConfirm(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all"
         >
            Join Tournament
         </button>
      </div>

      {/* Join Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full bg-slate-900 rounded-t-[2.5rem] p-8 border-t border-slate-700 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-slate-800 rounded-full mx-auto mb-8" />
              
              <h2 className="text-2xl font-bold text-white mb-2">Confirm Registration</h2>
              <p className="text-slate-400 text-sm mb-8">Enter your In-Game ID to proceed. Make sure it's accurate.</p>
              
              <div className="space-y-6">
                <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-2 block ml-1">Your Game ID (UID)</label>
                    <input 
                        type="text"
                        value={inGameId}
                        onChange={(e) => setInGameId(e.target.value)}
                        placeholder="e.g. 12345678"
                        className="w-full bg-slate-800 text-white font-bold px-4 py-4 rounded-2xl border border-slate-700 focus:border-orange-500 focus:outline-none transition-colors"
                    />
                </div>

                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-xs">Registration Fee</span>
                        <span className="text-white font-bold">NPR {tournament.entryFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs">Wallet Balance</span>
                        <span className={`font-bold ${isLowBalance ? 'text-red-500' : 'text-green-500'}`}>NPR {balance}</span>
                    </div>
                </div>

                {isLowBalance && (
                    <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-medium">
                        <AlertCircle size={16} /> Insufficient balance. Please load money first.
                    </div>
                )}

                <button 
                    disabled={isJoining || !inGameId || isLowBalance}
                    onClick={handleJoin}
                    className="w-full bg-white text-slate-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 transition-transform"
                >
                    {isJoining ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={18} /> Confirm Registration</>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TournamentDetailScreen;
