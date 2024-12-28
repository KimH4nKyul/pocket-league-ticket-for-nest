import { AddressHolder } from '../../src/shared/holder/holder';

export class FakeAddressHolder implements AddressHolder {
  constructor(private readonly _address: string) {}

  address(): string {
    return this._address;
  }
}
