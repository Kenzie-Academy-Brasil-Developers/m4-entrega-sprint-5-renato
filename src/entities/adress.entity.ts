import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("adresses")
class Adress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  district: string;

  @Column()
  zipCode: string;

  @Column({ nullable: true })
  number?: string;

  @Column()
  city: string;

  @Column()
  state: string;
}

export { Adress };
