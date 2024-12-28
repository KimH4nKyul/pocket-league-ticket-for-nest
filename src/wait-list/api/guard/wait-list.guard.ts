import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisService } from '../../../shared/redis/redis.service';
import { WaitListPowerService } from '../../application/service/wait-list-power.service';
import { TimeHolder } from '../../../shared/holder/holder';
import { WAITLIST_KEY } from '../../domain/constant';

@Injectable()
export class WaitListGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
    private readonly waitListPowerService: WaitListPowerService,
    @Inject('TIME_HOLDER') private readonly timeHolder: TimeHolder,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const power = await this.waitListPowerService.status();
    if (power === 'off') return true;

    const req = context.switchToHttp().getRequest();
    const key = req.headers['x-wait-list-key'];
    if (!key) throw new UnauthorizedException(`key not found`);

    const currentTime = this.timeHolder.date();

    const entryTime = await this.redisService.hget(
      `${WAITLIST_KEY}:${key}`,
      'entryTime',
    );
    const exitTime = await this.redisService.hget(
      `${WAITLIST_KEY}:${key}`,
      'exitTime',
    );
    if (!entryTime || !exitTime)
      throw new UnauthorizedException(`can not found time fields`);

    if (currentTime < Number(entryTime))
      throw new UnauthorizedException(`entry time has not been reached yet`);

    if (Number(exitTime) < currentTime)
      throw new UnauthorizedException(`already expired`);

    return true;
  }
}
