import { TimeHolder } from '../../../src/shared/holder/holder';

class FakeTimeHolder implements TimeHolder {
  constructor(private readonly _time: number) {}

  date(): number {
    return this._time;
  }
}

describe(`🎯 Time 홀더`, () => {
  let sut: TimeHolder;

  beforeAll(() => {
    sut = new FakeTimeHolder(1234567890);
  });

  it(`🟢 시간을 가져올 수 있음`, () => {
    const time = sut.date();

    expect(time).not.toBeNull();
    expect(time).toBe(1234567890);
  });
});
