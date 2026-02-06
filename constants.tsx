import { Game } from './types';
import { Zap, ShieldCheck, Headphones, Gift, Globe, Smartphone, Clock, Award, Wallet } from 'lucide-react';

export const LAUNCH_DATE = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 weeks from now

export const FEATURES = [
  {
    id: 1,
    title: "Instant Delivery",
    description: "Get your game credits delivered directly to your account in seconds after payment.",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    id: 2,
    title: "Secure Payments",
    description: "Bank-grade security ensures your money and personal data are always protected.",
    icon: ShieldCheck,
    color: "bg-green-100 text-green-600"
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help you with any issues, day or night.",
    icon: Headphones,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 4,
    title: "Rewards & Bonus",
    description: "Earn cashback and loyalty points on every top-up you make with us.",
    icon: Gift,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: 5,
    title: "Global Games",
    description: "Support for all major international titles like PUBG, Free Fire, Genshin Impact, and more.",
    icon: Globe,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    id: 6,
    title: "Easy App",
    description: "A user-friendly mobile app designed for the best top-up experience in Nepal.",
    icon: Smartphone,
    color: "bg-orange-100 text-orange-600"
  }
];

export const BENEFITS = [
  {
    id: 1,
    title: "Super Fast Processing",
    description: "99% of orders are completed within 30 seconds.",
    icon: Clock
  },
  {
    id: 2,
    title: "Official Distributor",
    description: "We are authorized resellers for major game publishers.",
    icon: Award
  },
  {
    id: 3,
    title: "Multiple Payment Options",
    description: "Pay with eSewa, Khalti, IME Pay, or Mobile Banking.",
    icon: Wallet
  }
];

export const GAMES: Game[] = [
  {
    id: 'freefire',
    name: 'Free Fire',
    publisher: 'Garena',
    image: 'https://images.unsplash.com/photo-1642388691925-5b4224db7c8d?auto=format&fit=crop&q=80&w=200&h=200',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=400',
    currencyName: 'Diamonds',
    placeholderId: 'Enter Player ID (UID)',
    packages: [
      { id: 'ff_1', name: '100 Diamonds', amount: 100, price: 110, currency: 'Diamonds' },
      { id: 'ff_2', name: '310 Diamonds', amount: 310, bonus: 31, price: 335, currency: 'Diamonds' },
      { id: 'ff_3', name: '520 Diamonds', amount: 520, bonus: 52, price: 560, currency: 'Diamonds' },
      { id: 'ff_4', name: '1060 Diamonds', amount: 1060, bonus: 106, price: 1120, currency: 'Diamonds' },
      { id: 'ff_5', name: 'Weekly Membership', amount: 450, price: 190, currency: 'Diamonds' },
    ]
  },
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    publisher: 'Tencent',
    image: 'https://images.unsplash.com/photo-1599961168128-44d2d46e300d?auto=format&fit=crop&q=80&w=200&h=200',
    coverImage: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=800&h=400',
    currencyName: 'UC',
    placeholderId: 'Enter Character ID',
    packages: [
      { id: 'pubg_1', name: '60 UC', amount: 60, price: 120, currency: 'UC' },
      { id: 'pubg_2', name: '325 UC', amount: 300, bonus: 25, price: 590, currency: 'UC' },
      { id: 'pubg_3', name: '660 UC', amount: 600, bonus: 60, price: 1150, currency: 'UC' },
      { id: 'pubg_4', name: '1800 UC', amount: 1500, bonus: 300, price: 3000, currency: 'UC' },
    ]
  },
  {
    id: 'mlbb',
    name: 'Mobile Legends',
    publisher: 'Moonton',
    image: 'https://images.unsplash.com/photo-1592631584826-6635c2452292?auto=format&fit=crop&q=80&w=200&h=200',
    coverImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800&h=400',
    currencyName: 'Diamonds',
    placeholderId: 'User ID (Zone ID)',
    packages: [
      { id: 'ml_1', name: '8 Diamonds', amount: 8, bonus: 1, price: 15, currency: 'Diamonds' },
      { id: 'ml_2', name: '36 Diamonds', amount: 33, bonus: 3, price: 65, currency: 'Diamonds' },
      { id: 'ml_3', name: '88 Diamonds', amount: 77, bonus: 11, price: 145, currency: 'Diamonds' },
      { id: 'ml_4', name: 'Twilight Pass', amount: 1, price: 1200, currency: 'Diamonds' },
    ]
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    publisher: 'HoYoverse',
    image: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=200&h=200',
    coverImage: 'https://images.unsplash.com/photo-1532007271951-c487760934ae?auto=format&fit=crop&q=80&w=800&h=400',
    currencyName: 'Crystals',
    placeholderId: 'Enter UID (Server)',
    packages: [
      { id: 'gen_1', name: '60 Crystals', amount: 60, price: 120, currency: 'Crystals' },
      { id: 'gen_2', name: '300 Crystals', amount: 300, bonus: 30, price: 650, currency: 'Crystals' },
      { id: 'gen_3', name: 'Welkin Moon', amount: 3000, price: 650, currency: 'Crystals' },
    ]
  },
  {
    id: 'roblox',
    name: 'Roblox',
    publisher: 'Roblox Corp',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=200&h=200',
    coverImage: 'https://images.unsplash.com/photo-1605218427306-022ba8c6f661?auto=format&fit=crop&q=80&w=800&h=400',
    currencyName: 'Robux',
    placeholderId: 'Username',
    packages: [
      { id: 'rb_1', name: '80 Robux', amount: 80, price: 130, currency: 'Robux' },
      { id: 'rb_2', name: '400 Robux', amount: 400, price: 600, currency: 'Robux' },
      { id: 'rb_3', name: '800 Robux', amount: 800, price: 1100, currency: 'Robux' },
    ]
  },
];