import { TimeHolder } from '../../src/shared/holder/holder';

export class FakeTimeHolder implements TimeHolder {
  constructor(private readonly _data: number) {}

  date(): number {
    return this._data;
  }
}
