import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Locations {
  @PrimaryGeneratedColumn()
  id: number;

  // 기본키 값은 수정해서는 안 됩니다 => 수정... 될수도있지 않을까???
  @Column({ length: 50, unique: true })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column('decimal', { precision: 9, scale: 6 })
  lat: number;

  @Column('decimal', { precision: 9, scale: 6 })
  lon: number;
}