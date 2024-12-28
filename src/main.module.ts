import { Module } from '@nestjs/common';
import { RedisModule } from './shared/redis/redis.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { WaitListModule } from './wait-list/wait-list.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    RedisModule.forRoot({
      host: 'redis',
      port: 6379,
    }),
    PrismaModule,
    WaitListModule,
    WalletModule,
  ],
})
export class MainModule {}
