import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LAUNCH_DATE } from '../constants';
import { Clock } from 'lucide-react';

const ComingSoon: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = LAUNCH_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-red-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-6">
          <Clock size={14} /> Official Launch Countdown
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-12">
          Coming Very Soon
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 flex items-center justify-center mb-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-slate-400 uppercase tracking-widest text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        <p className="text-lg text-slate-400 mb-8">Get notified when we launch. Available on iOS & Android.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button disabled className="opacity-60 cursor-not-allowed px-6 py-3 bg-slate-800 rounded-xl flex items-center gap-3 border border-slate-700 hover:border-slate-600 transition">
             <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path d="M17.523 15.3414C17.5134 11.6601 20.6698 9.77456 20.8122 9.68969C19.0493 7.15934 16.3214 6.81434 15.3853 6.77209C13.1098 6.54134 10.916 8.12009 9.75486 8.12009C8.58399 8.12009 6.78636 6.78459 4.86986 6.81909C2.41161 6.85284 0.160108 8.27484 -1.08202 11.8386C-2.35339 15.4851 -0.426358 20.9416 1.99611 24.4331C3.18523 26.1436 4.60098 28.0666 6.47198 28.0016C8.25748 27.9298 8.93898 26.8521 11.1115 26.8521C13.2737 26.8521 13.8837 28.0121 15.7535 27.9796C17.7262 27.9298 18.995 26.1661 20.171 24.4446C21.5235 22.4646 22.0835 20.5311 22.1035 20.4446C22.0597 20.4231 17.5687 18.7061 17.523 15.3414Z"/></svg>
             </div>
             <div className="text-left">
               <div className="text-[10px] uppercase">Coming Soon to</div>
               <div className="text-lg font-bold leading-none">App Store</div>
             </div>
          </button>
          
          <button disabled className="opacity-60 cursor-not-allowed px-6 py-3 bg-slate-800 rounded-xl flex items-center gap-3 border border-slate-700 hover:border-slate-600 transition">
             <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.944 1.944 0 01-.58-.02 1.998 1.998 0 01-1.015-.81 1.992 1.992 0 01-.326-1.127V3.771c0-.44.116-.85.326-1.127.21-.28.56-.566 1.015-.81.206-.11.4-.116.58-.02M15.49 13.69l3.41 3.407-3.085 1.76c-1.17.67-2.31 1.05-3.05.9l2.725-6.066M15.49 10.31l-2.725-6.068c.74-.15 1.88.232 3.05.9l3.085 1.76-3.41 3.409M19.984 12c0-.42-.09-.81-.25-1.14l-3.39 3.39 3.39 3.39c.16-.33.25-.72.25-1.14 0-.85-.35-1.62-.9-2.18l.9-2.31z"/></svg>
             </div>
             <div className="text-left">
               <div className="text-[10px] uppercase">Coming Soon to</div>
               <div className="text-lg font-bold leading-none">Google Play</div>
             </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
