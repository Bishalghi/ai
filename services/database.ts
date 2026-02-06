import { Game, Package, Transaction, User, Tournament } from '../types';
import { GAMES } from '../constants';

const DELAY = 800;

let mockBalance = 1500;
let mockTransactions: Transaction[] = [];
let mockTournaments: Tournament[] = [
  {
    id: 'tn_ff_1',
    gameId: 'freefire',
    gameName: 'Free Fire',
    title: 'FF Pro Scrims #42',
    entryFee: 50,
    prizePool: 2500,
    totalSlots: 48,
    joinedSlots: 32,
    startTime: new Date(Date.now() + 86400000), // Tomorrow
    status: 'Upcoming',
    type: 'Solo',
    map: 'Bermuda',
    rules: ['Must be Level 40+', 'Emulator not allowed', 'Screen recording mandatory for winners'],
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tn_pubg_1',
    gameId: 'pubg',
    gameName: 'PUBG Mobile',
    title: 'UC Winner Chicken Dinner',
    entryFee: 100,
    prizePool: 5000,
    totalSlots: 100,
    joinedSlots: 88,
    startTime: new Date(Date.now() - 3600000), // 1 hour ago
    status: 'Live',
    type: 'Squad',
    map: 'Erangel',
    rules: ['Official Rules apply', 'No teaming'],
    bannerImage: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=800'
  }
];

export const db = {
  getGames: async (): Promise<Game[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(GAMES), DELAY));
  },

  getUser: async (userId: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        id: userId,
        name: "Pro Gamer",
        email: "gamer@merotopup.com",
        balance: mockBalance,
        role: 'user'
      }), DELAY / 2);
    });
  },

  createOrder: async (userId: string, game: Game, pkg: Package, playerId: string): Promise<Transaction> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockBalance < pkg.price) {
          reject(new Error("Insufficient balance"));
          return;
        }
        mockBalance -= pkg.price;
        const newTx: Transaction = {
          id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          type: 'GAME_TOPUP',
          title: game.name,
          subtitle: `${pkg.name} • ${playerId}`,
          amount: pkg.price,
          date: new Date(),
          status: 'Pending',
          isDebit: true
        };
        mockTransactions.unshift(newTx);
        resolve(newTx);
      }, DELAY);
    });
  },

  loadWallet: async (amount: number, method: string): Promise<Transaction> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockBalance += amount;
        const newTx: Transaction = {
          id: `TXN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          type: 'WALLET_LOAD',
          title: 'Wallet Load',
          subtitle: `via ${method}`,
          amount: amount,
          date: new Date(),
          status: 'Success',
          isDebit: false
        };
        mockTransactions.unshift(newTx);
        resolve(newTx);
      }, DELAY);
    });
  },

  sendMoney: async (receiverId: string, amount: number): Promise<Transaction> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockBalance < amount) {
          reject(new Error("Insufficient balance"));
          return;
        }
        mockBalance -= amount;
        const newTx: Transaction = {
          id: `P2P-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          type: 'P2P_TRANSFER',
          title: 'Money Sent',
          subtitle: `To: ${receiverId}`,
          amount: amount,
          date: new Date(),
          status: 'Success',
          isDebit: true
        };
        mockTransactions.unshift(newTx);
        resolve(newTx);
      }, DELAY);
    });
  },

  getTransactions: async (): Promise<Transaction[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockTransactions), DELAY / 2));
  },
  
  getBalance: async (): Promise<number> => mockBalance,

  getTournaments: async (): Promise<Tournament[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockTournaments), DELAY));
  },

  joinTournament: async (tournamentId: string, inGameId: string): Promise<Transaction> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const t = mockTournaments.find(x => x.id === tournamentId);
        if (!t) {
          reject(new Error("Tournament not found"));
          return;
        }
        if (t.joinedSlots >= t.totalSlots) {
          reject(new Error("Tournament is full"));
          return;
        }
        if (mockBalance < t.entryFee) {
          reject(new Error("Insufficient wallet balance"));
          return;
        }

        mockBalance -= t.entryFee;
        t.joinedSlots += 1;
        
        const newTx: Transaction = {
          id: `TRN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          type: 'TOURNAMENT_ENTRY',
          title: `Joined: ${t.title}`,
          subtitle: `In-Game ID: ${inGameId}`,
          amount: t.entryFee,
          date: new Date(),
          status: 'Success',
          isDebit: true
        };
        mockTransactions.unshift(newTx);
        resolve(newTx);
      }, DELAY);
    });
  }
};
