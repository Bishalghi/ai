import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            M
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
            Mero<span className="text-orange-600">Topup</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-600 hover:text-orange-600 font-medium transition">Features</a>
          <a href="#why-choose" className="text-slate-600 hover:text-orange-600 font-medium transition">Why Us</a>
          <a href="#offers" className="text-slate-600 hover:text-orange-600 font-medium transition">Offers</a>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-slate-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0">
            Early Access
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl p-6 flex flex-col space-y-4">
          <a href="#features" className="text-slate-600 font-medium p-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#why-choose" className="text-slate-600 font-medium p-2" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
          <a href="#offers" className="text-slate-600 font-medium p-2" onClick={() => setMobileMenuOpen(false)}>Offers</a>
          <button className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold text-center">
            Join Waitlist
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
