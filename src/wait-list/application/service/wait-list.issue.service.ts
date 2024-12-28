import { Inject, Injectable } from '@nestjs/common';
import { TimeHolder, UuidHolder } from '../../../shared/holder/holder';
import { RedisService } from '../../../shared/redis/redis.service';
import {
  calculateEntryTime,
  calculateExitTime,
  createWaitListToken,
} from '../../domain/service/wait-list.domain-service';
import { WAITLIST_KEY } from '../../domain/constant';

@Injectable()
export class WaitListIssueService {
  constructor(
    @Inject('TIME_HOLDER') private readonly timeHolder: TimeHolder,
    @Inject('UUID_HOLDER') private readonly uuidHolder: UuidHolder,
    private readonly redisService: RedisService,
  ) {}

  // TODO: Expired 이벤트가 레디스 리소스를 많이 낭비할 시에, ZSET과 배치 스케줄러를 이용한 방안으로 대체할 수 있어야 함
  async issue(userId: string): Promise<string> {
    // 대기열에서 사용될 토큰 값을 생성
    const { token, issuedAt } = await createWaitListToken(
      userId,
      this.timeHolder,
      this.uuidHolder,
    );

    // 자기 순서를 통해 입장 가능 시간을 구함
    const position = await this.redisService.incr(`${WAITLIST_KEY}:count`);
    const entryTime = await calculateEntryTime(issuedAt, position);

    // 퇴장 시간을 구함
    const exitTime = await calculateExitTime(entryTime);

    // 토큰 발행 시간, 입장 가능 시간, 퇴장 시간을 메타데이터로 저장하고 TTL을 적용함
    await this.redisService.hset(`${WAITLIST_KEY}:${token}`, {
      issuedAt,
      entryTime,
      exitTime,
      position,
    });

    // HSET으로 저장한 키는 EXPIREAT로 지정된 타임스탬프에 제거되게 함
    await this.redisService.expireat(token, Math.floor(exitTime / 1000));

    return token;
  }

  async remove(token: string): Promise<void> {
    await this.redisService.del(token);
    await this.redisService.decr(`${WAITLIST_KEY}:count`);
  }

  async adjust(value: string): Promise<string> {
    return await this.redisService.set(`${WAITLIST_KEY}:count`, value);
  }
}
