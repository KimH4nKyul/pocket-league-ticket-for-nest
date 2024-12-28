import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from '../../../shared/redis/redis.service';
import { WAITLIST_KEY } from '../../domain/constant';

export type WaitListPowerMode = 'on' | 'off';

@Injectable()
export class WaitListPowerService {
  constructor(private readonly redisService: RedisService) {}

  async status(): Promise<WaitListPowerMode> {
    return (await this.redisService.get(
      `${WAITLIST_KEY}:power_mode`,
    )) as WaitListPowerMode;
  }

  async power(mode: WaitListPowerMode): Promise<string> {
    if (!['on', 'off'].includes(mode))
      throw new BadRequestException(`invalid power mode`);
    return await this.redisService.set(`${WAITLIST_KEY}:power_mode`, mode);
  }
}
