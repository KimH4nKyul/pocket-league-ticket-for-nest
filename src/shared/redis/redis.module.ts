import { Module, Global, DynamicModule } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

@Global()
@Module({})
export class RedisModule {
  static forRoot(options: RedisOptions): DynamicModule {
    const redisProvider = {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const client = new Redis({
          ...options,
          reconnectOnError: (err) => {
            const targetError = 'READONLY';
            if (err.message.includes(targetError)) {
              // Only reconnect when the error contains "READONLY"
              return true;
            }
            // Reconnect on all errors
            return 1;
          },
          retryStrategy: (times) => {
            // Exponential backoff strategy
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
        });

        client.on('error', (err) => {
          console.error('Redis Client Error', err);
        });
        client.on('connect', () => {
          console.log('Redis client connected');
        });
        client.on('ready', () => {
          console.log('Redis client ready');
        });
        client.on('end', () => {
          console.log('Redis client disconnected');
        });
        return client;
      },
    };

    return {
      module: RedisModule,
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }
}
