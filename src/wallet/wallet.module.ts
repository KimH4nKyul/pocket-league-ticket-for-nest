import { Module } from '@nestjs/common';
import { WalletApi } from './api/wallet.api';

@Module({
  controllers: [WalletApi],
  providers: [],
})
export class WalletModule {}
