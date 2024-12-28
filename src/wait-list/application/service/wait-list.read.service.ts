import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../../../shared/redis/redis.service';
import { calculateLeftMinutes } from '../../domain/service/wait-list.domain-service';
import { TimeHolder } from '../../../shared/holder/holder';
import { WaitListReadResult } from '../../domain/result/wait-list.read.result';
import { WAITLIST_KEY } from '../../domain/constant';

@Injectable()
export class WaitListReadService {
  constructor(
    @Inject('TIME_HOLDER') private readonly timeHolder: TimeHolder,
    private readonly redisService: RedisService,
  ) {}

  async get(key: string): Promise<WaitListReadResult> {
    const memberKey = `${WAITLIST_KEY}:${key}`;
    const currentTime = this.timeHolder.date();

    const entryTime = Number(
      await this.redisService.hget(memberKey, 'entryTime'),
    );
    const position = Number(
      await this.redisService.hget(memberKey, 'position'),
    );

    const leftMinutes = await calculateLeftMinutes(currentTime, entryTime);
    const left = position - 1;

    return {
      left,
      leftMinutes,
      position,
    };
  }
}
