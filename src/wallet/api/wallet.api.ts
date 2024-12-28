import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { Wallet } from '../domain/wallet';

export class WalletChargeRequest {
  readonly userId: number;
  readonly point: number;

  toDomain(): WalletCharge {
    return {
      ...this,
    };
  }
}

export class WalletCharge {
  userId: number;
  point: number;
}

export class WalletChargeResponse {
  userId: number;
  balance: number;

  static of(result: WalletChargeResult): WalletChargeResponse {
    return { ...result };
  }
}

export class WalletChargeResult {
  userId: number;
  balance: number;
}

export class WalletUseRequest {}
export class WaleltUseReponse {}

export class WalletUse {}
export class WalletUseResult {}

@Controller('/api/wallet')
export class WalletApi {
  constructor(private readonly walletUsecase: WalletUsecase) {}

  @Post('/charge')
  async charge(
    @Body() req: WalletChargeRequest,
  ): Promise<WalletChargeResponse> {
    const result = await this.walletUsecase.charge(req.toDomain());
    return WalletChargeResponse.of(result);
  }
}

@Injectable()
export class WalletUsecase {
  constructor(private readonly walletService: WalletService) {}

  async charge(cmd: WalletCharge): Promise<WalletChargeResult> {
    return {
      userId: 1,
      balance: 1,
    };
  }
  async use() {}
}

@Injectable()
export class WalletService {
  constructor(
    private readonly walletManager: WalletManager,
    private readonly walletReader: WalletReader,
  ) {}
}

@Injectable()
export class WalletReader {
  constructor(
    @Inject('WALLET_READ_REPOSITORY')
    private readonly walletRead: WalletReadRepository,
  ) {}
  async findByUserId(userId: number) {}
  async findByAddress(address: string) {}
}

@Injectable()
export class WalletManager {
  constructor(
    @Inject('WALLET_WRITE_REPOSITORY')
    private readonly walletWrite: WalletWriteRepository,
  ) {}
  async create() {}
  async charge() {}
  async use() {}
}

export interface WalletWriteRepository {
  update(wallet: Wallet): Promise<Wallet>;
  create(wallet: Wallet): Promise<Wallet>;
  delete(wallet: Wallet): Promise<void>;
  findByUserId(userId: number): Promise<Wallet>;
}

export interface WalletReadRepository {
  findByUserId(userId: number): Promise<Wallet>;
  findByAddress(address: string): Promise<Wallet>;
}

@Injectable()
export class WalletWritePostgresRepository implements WalletWriteRepository {
  update(wallet: Wallet): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }
  create(wallet: Wallet): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }
  delete(wallet: Wallet): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByUserId(userId: number): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }
}

@Injectable()
export class WalletReadPostgresRepository implements WalletReadRepository {
  findByUserId(userId: number): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }
  findByAddress(address: string): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }
}
