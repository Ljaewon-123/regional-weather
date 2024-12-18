import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column('decimal', { precision: 9, scale: 6 })
  lat: number;

  @Column('decimal', { precision: 9, scale: 6 })
  lon: number;
}