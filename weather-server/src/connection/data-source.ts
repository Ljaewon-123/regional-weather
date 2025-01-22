import { DataSource } from "typeorm";

import { ConfigService } from "@nestjs/config";

const configService = new ConfigService()

export const dataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: "postgres",
  password: "1234", //configService.get<string>("DB_PASSWORD"),
  database: "test",
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get<boolean>("DB_SYNCHRONIZE"),
  logging:true,
  // migrations
  migrations: ['dist/migrations/*.js'],
})
