import { TimeHolder } from '../../shared/holder/holder';

export enum PointUsageType {
  CHARGE = 'charge',
  USE = 'use',
}

export interface PointHistoryCreate {
  userId: number;
  point: number;
  type: PointUsageType;
}

export class PointHistory {
  readonly id?: number;
  readonly userId: number;
  readonly point: number;
  readonly type: PointUsageType;
  readonly createdAt: number;

  constructor({ id, userId, point, type, createdAt }: PointHistoryInterface) {
    this.id = id;
    this.userId = userId;
    this.point = point;
    this.type = type;
    this.createdAt = createdAt.getTime();
  }

  static of(cmd: PointHistoryCreate, timeHolder: TimeHolder): PointHistory {
    return new PointHistory({
      ...cmd,
      createdAt: new Date(timeHolder.date()),
    });
  }
}

export class PointHistoryInterface {
  id?: number;
  userId: number;
  point: number;
  type: PointUsageType;
  createdAt: Date;

  static of(pointHistory: PointHistory): PointHistoryInterface {
    return {
      ...pointHistory,
      createdAt: new Date(pointHistory.createdAt),
    };
  }

  static toDomain(pointHistory: PointHistoryInterface): PointHistory {
    return new PointHistory(pointHistory);
  }
}
