import { Injectable } from '@nestjs/common';
import { TimeHolder } from './holder';

@Injectable()
export class SystemTimeHolder implements TimeHolder {
  date(): number {
    return Date.now();
  }
}
