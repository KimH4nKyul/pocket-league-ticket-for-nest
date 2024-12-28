import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { WaitListUsecase } from '../application/wait-list.usecase';
import { WaitListPowerMode } from '../application/service/wait-list-power.service';
import { WaitListReadResponse } from './response/wait-list.read.response';
import { WaitListIssueRequest } from './request/wait-list.issue.request';

@Controller('/api/wait-list')
export class WaitListApi {
  constructor(private readonly waitListUsecase: WaitListUsecase) {}

  @Post('/token')
  async issue(@Body() req: WaitListIssueRequest): Promise<string> {
    return await this.waitListUsecase.issue(req.userId);
  }

  // TODO: `get`에 대한 단위 테스트 코드 작성
  @Get('/token')
  async get(
    @Headers('x-wait-list-key') key: string,
  ): Promise<WaitListReadResponse> {
    return await this.waitListUsecase.get(key);
  }

  // TODO: `power`는 통합 테스트 대상으로, 통합 테스트로 작성
  @Put()
  async power(@Query('power') mode: string): Promise<string> {
    return await this.waitListUsecase.power(mode as WaitListPowerMode);
  }
}
