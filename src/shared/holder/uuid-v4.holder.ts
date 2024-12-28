import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UuidHolder } from './holder';

@Injectable()
export class UuidV4Holder implements UuidHolder {
  uuid(): string {
    return uuidv4().replace(/-/g, '');
  }
}
