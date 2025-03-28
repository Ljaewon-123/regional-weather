import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { WeatherModule } from './weather/weather.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConnectionService } from './connection/conected-db.service';
import { BullModule } from '@nestjs/bullmq';
import { BullConfigService } from './connection/bull-config.service';
import { ScheduleConsumer } from './weather/processor.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConnectionService
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useClass: BullConfigService
    }),
    ScheduleModule.forRoot(),
    WeatherModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // ScheduleConsumer // 여기서도 기능은 된다. # 서비스 주입을 위해 weather module로 이동
  ],
})
export class AppModule {}
