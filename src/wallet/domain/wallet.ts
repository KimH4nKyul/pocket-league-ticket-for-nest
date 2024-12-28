import { AddressHolder } from '../../shared/holder/holder';
import { WalletCreate } from './command/wallet.create';
import { WalletInterface } from './interface/wallet.interface';

export class Wallet {
  readonly id?: number;
  readonly userId: number;
  readonly address: string;
  readonly balance: number;

  constructor({ id, userId, address, balance }: WalletInterface) {
    this.id = id;
    this.userId = userId;
    this.address = address;
    this.balance = balance;
  }

  static of(cmd: WalletCreate, addressHolder: AddressHolder): Wallet {
    return new Wallet({
      ...cmd,
      address: addressHolder.address(),
      balance: 0,
    });
  }

  charge(point: number): Wallet {
    return new Wallet({
      ...this,
      balance: this.balance + point,
    });
  }

  use(point: number): Wallet {
    if (this.balance < point) throw new Error(`잔액이 부족함`);

    return new Wallet({
      ...this,
      balance: this.balance - point,
    });
  }
}
