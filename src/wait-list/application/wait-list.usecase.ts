import { Injectable } from '@nestjs/common';
import { WaitListIssueService } from './service/wait-list.issue.service';
import { WaitListReadService } from './service/wait-list.read.service';
import { WaitListReadResult } from '../domain/result/wait-list.read.result';
import {
  WaitListPowerMode,
  WaitListPowerService,
} from './service/wait-list-power.service';

@Injectable()
export class WaitListUsecase {
  constructor(
    private readonly waitListIssueService: WaitListIssueService,
    private readonly waitListReadService: WaitListReadService,
    private readonly waitListPowerService: WaitListPowerService,
  ) {}

  async issue(userId: string): Promise<string> {
    return await this.waitListIssueService.issue(userId);
  }

  async remove(token: string): Promise<void> {
    await this.waitListIssueService.remove(token);
  }

  async get(key: string): Promise<WaitListReadResult> {
    return await this.waitListReadService.get(key);
  }

  async power(mode: WaitListPowerMode): Promise<string> {
    return await this.waitListPowerService.power(mode);
  }
}
