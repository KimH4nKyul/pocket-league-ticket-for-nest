import { UuidHolder } from '../../src/shared/holder/holder';

export class FakeUuidHolder implements UuidHolder {
  constructor(private readonly _uuid: string) {}

  uuid(): string {
    return this._uuid;
  }
}
