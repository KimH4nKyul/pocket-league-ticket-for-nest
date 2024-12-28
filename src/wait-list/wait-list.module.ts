import { Module } from '@nestjs/common';
import { WaitListApi } from './api/wait-list.api';
import { RedisService } from '../shared/redis/redis.service';
import { UuidV4Holder } from '../shared/holder/uuid-v4.holder';
import { WaitListUsecase } from './application/wait-list.usecase';
import { WaitListIssueService } from './application/service/wait-list.issue.service';
import { SystemTimeHolder } from '../shared/holder/system-time.holder';
import { WaitListReadService } from './application/service/wait-list.read.service';
import { WaitListPowerService } from './application/service/wait-list-power.service';

@Module({
  controllers: [WaitListApi],
  providers: [
    WaitListUsecase,
    WaitListIssueService,
    WaitListReadService,
    WaitListPowerService,
    RedisService,
    {
      provide: 'TIME_HOLDER',
      useClass: SystemTimeHolder,
    },
    {
      provide: 'UUID_HOLDER',
      useClass: UuidV4Holder,
    },
  ],
})
export class WaitListModule {}
