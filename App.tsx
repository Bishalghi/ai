import React, { useState, useEffect } from 'react';
import { Home, Wallet, ShoppingBag, User, Bell, Search, Trophy, ScanLine, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Game, Package, Tab, Transaction, Tournament } from './types';
import { db } from './services/database';

// Screens & Components
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';
import AuthScreen from './components/AuthScreen';
import GameDetailScreen from './components/GameDetailScreen';
import CheckoutScreen from './components/CheckoutScreen';
import OrdersScreen from './components/OrdersScreen';
import WalletScreen from './components/WalletScreen';
import ScanScreen from './components/ScanScreen';
import ProfileScreen from './components/ProfileScreen';
import TournamentListScreen from './components/TournamentListScreen';
import TournamentDetailScreen from './components/TournamentDetailScreen';

// --- Sub-components ---

const BottomNav: React.FC<{ activeTab: Tab; onTabChange: (t: Tab) => void }> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'tournaments', icon: Trophy, label: 'Tournaments' },
    { id: 'wallet', icon: Wallet, label: 'Wallet', isSpecial: true },
    { id: 'orders', icon: ShoppingBag, label: 'Orders' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-50 pointer-events-none">
      <div className="w-full max-w-[440px] bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-[2rem] shadow-2xl p-2 pointer-events-auto">
        <div className="flex justify-between items-center px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            if (item.isSpecial) {
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id as Tab)}
                  className="relative -mt-8 group"
                >
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center border-[6px] border-slate-900 shadow-xl transform transition-transform group-active:scale-95">
                    <item.icon size={28} className="text-white" />
                  </div>
                </button>
              );
            }
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id as Tab)}
                className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${isActive ? '' : 'text-slate-500 hover:text-slate-400'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 bg-white/5 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`relative z-10 ${isActive ? 'text-orange-500' : ''}`} 
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Home Screen ---
const HomeScreen: React.FC<{ 
    games: Game[]; 
    tournaments: Tournament[];
    isLoading: boolean; 
    onGameSelect: (game: Game) => void; 
    onTournamentSelect: (t: Tournament) => void;
    userName?: string 
}> = ({ games, tournaments, isLoading, onGameSelect, onTournamentSelect, userName }) => (
  <div className="pb-32 pt-8 px-5 space-y-8 animate-fade-in">
    {/* Header */}
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-1">
          Namaste, {userName || "Gamer"} <span className="animate-wave inline-block">👋</span>
        </h1>
        <p className="text-slate-400 text-sm">Join a match or top up now</p>
      </div>
      <button className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 relative hover:bg-slate-700 transition-colors">
        <Bell size={22} />
        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-800"></span>
      </button>
    </div>

    {/* Featured Tournament Card */}
    {tournaments.length > 0 && !isLoading && (
        <section>
            <h2 className="text-xl font-bold text-white mb-4">Trending Match</h2>
            <motion.div 
                whileTap={{ scale: 0.98 }}
                onClick={() => onTournamentSelect(tournaments[0])}
                className="relative h-48 rounded-3xl overflow-hidden group cursor-pointer border border-slate-700 shadow-2xl"
            >
                <img src={tournaments[0].bannerImage} className="w-full h-full object-cover" alt="Tournament" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="px-2 py-0.5 bg-orange-500 rounded-md text-[8px] font-black text-white uppercase mb-1 inline-block">Featured</span>
                            <h3 className="text-lg font-bold text-white leading-tight">{tournaments[0].title}</h3>
                            <p className="text-slate-400 text-xs">Prizes: NPR {tournaments[0].prizePool}</p>
                        </div>
                        <button className="bg-white text-slate-900 p-2 rounded-xl shadow-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <Trophy size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    )}

    {/* Games Grid */}
    <div>
      <div className="flex justify-between items-end mb-5">
        <h2 className="text-xl font-bold text-white">Top-Up Store</h2>
        <button className="text-xs font-bold text-orange-500 hover:text-orange-400">View All</button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4].map(i => (
                <div key={i} className="aspect-[4/3] bg-slate-800 rounded-[1.5rem] animate-pulse"></div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
            {games.map((game, index) => (
            <motion.button 
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onGameSelect(game)}
                className="group relative bg-slate-800 rounded-[1.5rem] border border-slate-700 overflow-hidden text-left hover:border-orange-500/50 transition-all duration-300 shadow-xl"
            >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60"></div>
                <img src={game.coverImage} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt={game.name} />
                <div className="absolute bottom-3 left-3 z-20">
                    <img src={game.image} className="w-10 h-10 rounded-xl border-2 border-white/20 shadow-lg" alt="Icon" />
                </div>
                </div>
                <div className="p-4 pt-3">
                <h3 className="text-sm font-bold text-white leading-tight mb-1">{game.name}</h3>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">{game.publisher}</p>
                </div>
            </motion.button>
            ))}
        </div>
      )}
    </div>
  </div>
);

// --- Main App Component ---

type ViewState = 'splash' | 'onboarding' | 'auth' | 'app' | 'checkout';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('splash');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  
  const [games, setGames] = useState<Game[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isGamesLoading, setIsGamesLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setViewState('onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (viewState === 'app') {
        setIsGamesLoading(true);
        Promise.all([
            db.getGames(),
            db.getTournaments()
        ]).then(([gData, tData]) => {
            setGames(gData);
            setTournaments(tData);
            setIsGamesLoading(false);
        });
        
        if (user) {
            db.getBalance().then(setBalance);
            db.getTransactions().then(setTransactions);
        }
    }
  }, [viewState, user]);

  const handleLoginSuccess = async (userData: any) => {
    const dbUser = await db.getUser(userData.id);
    setUser(dbUser);
    setBalance(dbUser.balance);
    setViewState('app');
  };

  const handleJoinTournament = async (inGameId: string) => {
      if (!selectedTournament || !user) return;
      try {
          await db.joinTournament(selectedTournament.id, inGameId);
          setBalance(await db.getBalance());
          setTransactions(await db.getTransactions());
          alert("Successfully joined tournament!");
          setSelectedTournament(null);
          setActiveTab('orders');
      } catch (e: any) {
          throw e;
      }
  };

  const handlePaymentConfirm = async (playerId: string) => {
    if (!selectedGame || !selectedPackage) return;
    try {
        await db.createOrder(user.id, selectedGame, selectedPackage, playerId);
        setBalance(await db.getBalance());
        setTransactions(await db.getTransactions());
        alert(`Top-up placed for ${selectedGame.name}`);
        setViewState('app');
        setSelectedGame(null);
        setSelectedPackage(null);
        setActiveTab('orders');
    } catch (e: any) {
        alert("Payment Failed: " + e.message);
    }
  };

  const handleLoadFunds = async (amount: number, method: string) => {
    try {
        await db.loadWallet(amount, method);
        setBalance(await db.getBalance());
        setTransactions(await db.getTransactions());
        alert(`Loaded NPR ${amount} successfully!`);
    } catch (e) {
        alert("Failed to load funds");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setBalance(0);
    setTransactions([]);
    setViewState('auth');
    setActiveTab('home');
  };

  return (
    <div className="bg-black min-h-screen flex justify-center font-sans">
      <div className="w-full max-w-[440px] bg-slate-900 h-screen relative overflow-y-auto overflow-x-hidden shadow-2xl no-scrollbar border-x border-slate-800">
        <AnimatePresence mode="wait">
          {viewState === 'splash' && (
            <motion.div key="splash" exit={{ opacity: 0 }} className="absolute inset-0 z-50"><SplashScreen /></motion.div>
          )}

          {viewState === 'onboarding' && (
             <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -100 }} className="absolute inset-0 z-40"><Onboarding onComplete={() => setViewState('auth')} /></motion.div>
          )}

          {viewState === 'auth' && (
             <motion.div key="auth" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="absolute inset-0 z-40"><AuthScreen onLoginSuccess={handleLoginSuccess} /></motion.div>
          )}

          {viewState === 'checkout' && selectedGame && selectedPackage && (
             <motion.div key="checkout" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="absolute inset-0 z-50 bg-slate-900">
                <CheckoutScreen game={selectedGame} pkg={selectedPackage} walletBalance={balance} onBack={() => { setViewState('app'); setSelectedPackage(null); }} onConfirm={handlePaymentConfirm} />
             </motion.div>
          )}

          {viewState === 'app' && (
            <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
              {selectedGame ? (
                <div className="absolute inset-0 z-40 bg-slate-900 overflow-y-auto no-scrollbar">
                  <GameDetailScreen game={selectedGame} onBack={() => setSelectedGame(null)} onSelectPackage={(pkg) => { setSelectedPackage(pkg); setViewState('checkout'); }} />
                </div>
              ) : selectedTournament ? (
                <div className="absolute inset-0 z-40 bg-slate-900 overflow-y-auto no-scrollbar">
                  <TournamentDetailScreen tournament={selectedTournament} balance={balance} onBack={() => setSelectedTournament(null)} onJoin={handleJoinTournament} />
                </div>
              ) : (
                <motion.div key={activeTab} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="h-full">
                  {activeTab === 'home' && <HomeScreen games={games} tournaments={tournaments} isLoading={isGamesLoading} onGameSelect={setSelectedGame} onTournamentSelect={setSelectedTournament} userName={user?.name} />}
                  {activeTab === 'tournaments' && <TournamentListScreen tournaments={tournaments} onSelect={setSelectedTournament} />}
                  {activeTab === 'orders' && <OrdersScreen transactions={transactions} />}
                  {activeTab === 'wallet' && <WalletScreen balance={balance} onLoadFunds={handleLoadFunds} />}
                  {activeTab === 'profile' && <ProfileScreen user={user} balance={balance} onLogout={handleLogout} />}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {viewState === 'app' && !selectedGame && !selectedTournament && <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />}
      </div>
    </div>
  );
};

export default App;
