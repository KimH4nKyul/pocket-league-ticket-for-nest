import { WaitListReadResult } from '../../domain/result/wait-list.read.result';

export class WaitListReadResponse {
  left: number; // 입장까지 남은 사람
  leftMinutes: number; // 입장까지 남은 시간
  position: number; // 본인 순서

  static of(result: WaitListReadResult): WaitListReadResponse {
    return { ...result };
  }
}
