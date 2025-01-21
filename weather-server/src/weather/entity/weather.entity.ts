import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Locations } from "./location.entity";

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Locations)
  @JoinColumn({ name: 'locationId' })
  location: Locations;

  @Column()  // 날짜
  date: string;

  @Column({ length: 10 })  // 시간
  time: string;

  @Column({ length: 50 })  // 날씨
  weatherCondition: string;

  @Column({ nullable: true })  // 체감온도 
  perceivedTemperature: string;

  @Column({ nullable: true })  // 강수량
  precipitation: string;

  @Column({ length: 10 })  // 강수확률
  precipitationProbability: string;

  @Column({ length: 50 })  // 바람
  wind: string;

  @Column({ length: 10 })  // 습도
  humidity: string;

  @Column({ nullable: true })  // 한파영향향
  coldWaveEffect: string;

  @Column({ length: 50, nullable: true })   // 적설강도 
  snowfallIntensity: string;

  @CreateDateColumn()
  createdAt: Date;
}