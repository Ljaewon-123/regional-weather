import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>("DB_HOST"),
      port: this.configService.get<number>("DB_PORT"),
      username: this.configService.get<string>("DB_USERNAME"),
      password: this.configService.get<string>("DB_PASSWORD"),
      database: this.configService.get<string>("DB_NAME"),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: this.configService.get<boolean>("DB_SYNCHRONIZE"),
      namingStrategy: new SnakeNamingStrategy(),
      extra: {
        // SSL 연결을 강제 설정
        ssl: { rejectUnauthorized: false },
      },
      // logging: true,
    }
  }
}