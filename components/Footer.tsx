import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="text-2xl font-bold text-slate-900">
                Mero<span className="text-orange-600">Topup</span>
              </span>
            </div>
            <p className="text-slate-500 max-w-sm mb-6 leading-relaxed">
              Nepal's fastest-growing digital wallet. Making payments simple, secure, and rewarding for everyone.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Features', 'Offers', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-orange-600 transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-500">
                <Mail size={16} /> support@merotopup.com
              </li>
              <li className="text-slate-500">Kathmandu, Nepal</li>
              <li className="text-slate-500">+977 1-4XXXXXX</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Mero Topup. All rights reserved. Nepal Digital Wallet.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
