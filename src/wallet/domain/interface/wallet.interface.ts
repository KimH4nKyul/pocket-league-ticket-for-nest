import { Wallet } from '../wallet';

export class WalletInterface {
  id?: number;
  userId: number;
  address: string;
  balance: number;

  static of(wallet: Wallet): WalletInterface {
    return { ...wallet };
  }

  static toDomain(wallet: WalletInterface): Wallet {
    return new Wallet(wallet);
  }
}
