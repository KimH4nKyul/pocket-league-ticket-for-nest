import { WaitListToken } from '../wait-list-token';
import { MINUTE_PER_CYCLE, USER_PER_CYCLE } from '../constant';
import { TimeHolder, UuidHolder } from '../../../shared/holder/holder';

export const calculateEntryTime = async (
  currentTime: number,
  position: number,
): Promise<number> => {
  if (position <= USER_PER_CYCLE) return currentTime;
  const userPerCycle = Math.ceil(position / USER_PER_CYCLE);
  const minutePerCycle = userPerCycle * MINUTE_PER_CYCLE;
  const entryTime = currentTime + minutePerCycle * 60000;
  return entryTime;
};

export const calculateExitTime = async (entryTime: number): Promise<number> => {
  return entryTime + MINUTE_PER_CYCLE * 60000;
};

export const calculateLeftMinutes = async (
  currentTime: number,
  entryTime: number,
): Promise<number> => {
  return Math.ceil((entryTime - currentTime) / 60000);
};

export const createWaitListToken = async (
  userId: string,
  timeHolder: TimeHolder,
  uuidHolder: UuidHolder,
): Promise<WaitListToken> => {
  const uuid = uuidHolder.uuid();
  const token = `${uuid}:${userId}`;
  const issuedAt = timeHolder.date();

  return {
    token,
    issuedAt,
  };
};
