import { AddressHolder } from './holder';

export class BlockchainAddressHolder implements AddressHolder {
  address(): string {
    throw new Error('Method not implemented.');
  }
}
