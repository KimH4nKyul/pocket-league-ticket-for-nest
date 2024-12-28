import {
  Injectable,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Redis } from 'ioredis';
import { WAITLIST_KEY } from '../../wait-list/domain/constant';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async onModuleInit() {
    // TODO: 책임 분리하기
    await this.redisClient.config('SET', 'notify-keyspace-events', 'Ex');
    await this.redisClient.subscribe('__keyevent@0__:expired');

    this.redisClient.on('message', async (_: string, key: string) => {
      if (key.startsWith(`${WAITLIST_KEY}:count`))
        await this.decr(`${WAITLIST_KEY}:count`);
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.redisClient.quit();
  }

  async incr(key: string): Promise<number> {
    return await this.redisClient.incr(key);
  }

  async decr(key: string): Promise<number> {
    return await this.redisClient.decr(key);
  }

  async zrank(key: string, member: string): Promise<number | null> {
    return await this.redisClient.zrank(key, member);
  }

  async zrem(key: string, member: string) {
    return await this.redisClient.zrem(key, member);
  }

  async zadd(key: string, score: number, member: string): Promise<number> {
    return await this.redisClient.zadd(key, score, member);
  }

  async hset(key: string, value: object): Promise<number> {
    return await this.redisClient.hset(key, value);
  }

  async set(key: string, value: string): Promise<string> {
    return await this.redisClient.set(key, value);
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    return await this.redisClient.hgetall(key);
  }

  async hget(key: string, field: string | Buffer): Promise<string | null> {
    return await this.redisClient.hget(key, field);
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async del(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  async expireat(key: string, timestamp: number): Promise<number> {
    return await this.redisClient.expireat(key, timestamp);
  }
}
