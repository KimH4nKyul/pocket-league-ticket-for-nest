import { SystemTimeHolder } from '../../../../src/shared/holder/system-time.holder';
import {
  USER_PER_CYCLE,
  MINUTE_PER_CYCLE,
} from '../../../../src/wait-list/domain/constant';
import {
  calculateEntryTime,
  calculateLeftMinutes,
} from '../../../../src/wait-list/domain/service/wait-list.domain-service';

describe(`🎯 대기열 도메인 서비스`, () => {
  it(`🟢 자기 순서가 사이클당 처리 가능한 인원 수보다 작거나 같은 경우에는 바로 입장할 수 있음`, async () => {
    const currentTime = new SystemTimeHolder().date();
    const position = 10;

    const entryTime = await calculateEntryTime(currentTime, position);

    expect(entryTime).toBeDefined();
    expect(entryTime).toBe(currentTime);
  });

  it(`🟢 자기 순서가 사이클당 처리 가능한 인원 수보다 크다면 한 사이클 처리 시간만큼 대기 후 입장할 수 있음`, async () => {
    const currentTime = new SystemTimeHolder().date();
    const positon = 11;

    const entryTime = await calculateEntryTime(currentTime, positon);
    const expectTime =
      currentTime +
      Math.ceil(positon / USER_PER_CYCLE) * MINUTE_PER_CYCLE * 60000;

    expect(entryTime).toBe(expectTime);
  });

  it(`🟢 현재 시간과 입장 가능 시간을 통해 입장까지 남은 시간(분)을 계산할 수 있음`, async () => {
    const currentTime = new SystemTimeHolder().date();
    const positon = 11;

    const entryTime = await calculateEntryTime(currentTime, positon);
    const leftMinutes = await calculateLeftMinutes(currentTime, entryTime);

    expect(leftMinutes).toBe(10);
  });
});
