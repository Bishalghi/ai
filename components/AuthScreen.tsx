import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

interface AuthScreenProps {
  onLoginSuccess: (user: any) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const validate = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    if (!isLogin && name.length < 2) {
      setError('Please enter your full name.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setError('');

    // Simulate Firebase Authentication Delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock Error (optional, for demo)
      // if (Math.random() > 0.8) { setError("Network error. Please try again."); return; }

      const user = {
        name: isLogin ? (name || "Gamer") : name,
        email: email,
        id: Math.random().toString(36).substr(2, 9)
      };
      
      onLoginSuccess(user);
    }, 1500);
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col p-6 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="mt-12 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg mb-6"
        >
          M
        </motion.div>
        <motion.h1 
          key={isLogin ? 'login-h' : 'signup-h'}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-display font-bold text-white mb-2"
        >
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </motion.h1>
        <motion.p 
          key={isLogin ? 'login-p' : 'signup-p'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400"
        >
          {isLogin ? 'Sign in to continue to your wallet.' : 'Join the fastest gaming top-up platform.'}
        </motion.p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
        
        <AnimatePresence mode="popLayout">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-1"
            >
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 focus:border-brand-primary focus:outline-none transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 focus:border-brand-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 focus:border-brand-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {isLogin && (
            <div className="text-right">
                <button type="button" className="text-sm text-brand-primary font-medium hover:underline">Forgot Password?</button>
            </div>
        )}

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2 text-red-500 text-sm"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1"></div>

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              {isLogin ? 'Log In' : 'Create Account'} <ArrowRight size={20} />
            </>
          )}
        </button>

        {/* Toggle Mode */}
        <div className="text-center mt-4 pb-4">
          <span className="text-slate-400 text-sm">{isLogin ? "Don't have an account?" : "Already have an account?"} </span>
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-brand-primary font-bold text-sm hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthScreen;
