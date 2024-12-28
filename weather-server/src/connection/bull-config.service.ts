import { BullRootModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueueOptions } from 'bullmq';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(private configService: ConfigService) {}
  createSharedConfiguration(): QueueOptions {
    return {
      connection: {
        host: this.configService.get<string>("REDIS_HOST"),
        port: this.configService.get<number>("REDIS_PORT"),
        db: this.configService.get<number>("REDIS_DB"),
      },
    };
  }
}