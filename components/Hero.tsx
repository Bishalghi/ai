import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-orange-200">
              Launching Soon in Nepal 🇳🇵
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Smart Top-Up & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                Digital Wallet
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Experience the fastest, most secure way to pay, send money, and manage your finances in Nepal. Join thousands waiting for the revolution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group">
                Join Early Access <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-800 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <Smartphone size={20} className="text-slate-500" /> App Coming Soon
              </button>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-slate-500 text-sm font-medium">
                <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                             <img src={`https://picsum.photos/100/100?random=${i}`} alt="user" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <span>2,000+ people joined waitlist</span>
            </div>
          </motion.div>

          {/* Phone Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 w-full max-w-[400px] lg:max-w-none relative"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-orange-500/20 to-red-500/20 rounded-full filter blur-3xl -z-10"></div>
             <div className="animate-float">
                <PhoneMockup />
             </div>
             
             {/* Floating Badge */}
             <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-20 -right-4 md:right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-30 max-w-[160px]"
             >
                 <div className="flex items-center gap-3 mb-2">
                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                         <Smartphone size={16} />
                     </div>
                     <span className="text-xs font-bold text-slate-800">Topup Success</span>
                 </div>
                 <div className="text-lg font-bold text-slate-900">NPR 500</div>
                 <div className="text-[10px] text-slate-400">Just now • NTC Prepaid</div>
             </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
