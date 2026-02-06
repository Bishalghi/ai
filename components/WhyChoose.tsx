import React from 'react';
import { motion } from 'framer-motion';
import { BENEFITS } from '../constants';
import { CheckCircle2 } from 'lucide-react';

const WhyChoose: React.FC = () => {
  return (
    <section id="why-choose" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1 space-y-8">
            <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              The Digital Wallet <br/> Nepal Trusts
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We built Mero Topup with one goal: to simplify the financial lives of every Nepali. Security, speed, and simplicity are at our core.
            </p>
            
            <div className="grid gap-6">
              {BENEFITS.map((benefit, index) => (
                <motion.div 
                  key={benefit.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600">
                    <benefit.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{benefit.title}</h4>
                    <p className="text-slate-500 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 className="bg-white p-6 rounded-3xl shadow-xl space-y-4 mt-12"
               >
                 <div className="h-2 w-12 bg-gray-200 rounded-full"></div>
                 <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
                 <div className="aspect-square bg-orange-50 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl font-bold text-orange-500">Fast</span>
                 </div>
               </motion.div>
               <motion.div 
                 initial={{ y: -20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 className="bg-slate-900 p-6 rounded-3xl shadow-xl space-y-4 text-white"
               >
                 <div className="h-2 w-12 bg-slate-700 rounded-full"></div>
                 <div className="h-2 w-24 bg-slate-800 rounded-full"></div>
                 <div className="aspect-square bg-slate-800 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 size={48} className="text-green-400" />
                 </div>
               </motion.div>
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 className="col-span-2 bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-3xl shadow-2xl text-white flex items-center justify-between"
               >
                  <div>
                    <div className="text-3xl font-bold">1M+</div>
                    <div className="text-white/80 text-sm">Transactions Processed</div>
                  </div>
                  <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <CheckCircle2 />
                  </div>
               </motion.div>
            </div>
            {/* blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/50 rounded-full filter blur-3xl -z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
