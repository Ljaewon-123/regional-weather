import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sido } from "./sido.entity";
import { Locations } from "./location.entity";

@Entity()
export class GuData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  code: string;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Sido, sido => sido.guData)
  sido: Sido

  @OneToMany(() => Locations, location => location.guData, { cascade: true, eager: true })
  locations: Locations
}

//  Eager 관계는 관계의 한 쪽에서만 사용할 수 있으며 eager: true관계의 양쪽에서 사용하는 것은 허용되지 않습니다.