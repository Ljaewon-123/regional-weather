import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GuData } from "./gu-data.entity";

@Entity()
export class Sido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  code: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => GuData, guData => guData.sido, { eager: true })
  guData: GuData
}