import { UuidHolder } from '../../../src/shared/holder/holder';
import { UuidV4Holder } from '../../../src/shared/holder/uuid-v4.holder';

describe(`🎯 UUID 홀더`, () => {
  let sut: UuidHolder;

  beforeAll(() => {
    sut = new UuidV4Holder();
  });

  it(`🟢 UUIDv4 값을 생성할 수 있음`, () => {
    const uuid = sut.uuid();

    expect(uuid).not.toBeNull();
  });

  it(`🟢 UUIDv4 값은 '-'가 제거됨`, () => {
    const uuid = sut.uuid();

    expect(uuid.includes('-')).toBeFalsy();
  });
});
