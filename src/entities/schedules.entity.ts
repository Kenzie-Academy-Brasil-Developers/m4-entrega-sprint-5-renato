import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Properties } from "./property.entity";
import { User } from "./user.entity";

@Entity("schedules")
class Schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties, (Properties) => Properties.schedules)
  property: Properties;

  @ManyToOne(() => User, (User) => User.schedules)
  user: User;
}

export { Schedules };
