export type CurrencyType = 'UC' | 'Diamonds' | 'Robux' | 'Crystals' | 'Credits';

export interface Package {
  id: string;
  gameId?: string;
  name: string;
  amount: number;
  bonus?: number;
  price: number;
  currency: CurrencyType;
  isActive?: boolean;
}

export interface Game {
  id: string;
  name: string;
  publisher: string;
  image: string;
  coverImage: string;
  currencyName: CurrencyType;
  placeholderId: string;
  isActive?: boolean;
  packages: Package[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  role: 'user' | 'admin';
}

export type TournamentStatus = 'Upcoming' | 'Live' | 'Completed';
export type TournamentType = 'Solo' | 'Duo' | 'Squad';

export interface Tournament {
  id: string;
  gameId: string;
  gameName: string;
  title: string;
  entryFee: number;
  prizePool: number;
  totalSlots: number;
  joinedSlots: number;
  startTime: Date;
  status: TournamentStatus;
  type: TournamentType;
  map: string;
  rules: string[];
  bannerImage: string;
}

export type TransactionType = 'GAME_TOPUP' | 'WALLET_LOAD' | 'P2P_TRANSFER' | 'TOURNAMENT_ENTRY';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number;
  date: Date;
  status: 'Success' | 'Pending' | 'Failed';
  isDebit: boolean;
}

export type Tab = 'home' | 'tournaments' | 'wallet' | 'orders' | 'profile';
