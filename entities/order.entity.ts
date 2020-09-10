import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Pizza } from "./pizza.entity";

@Index("fk_order_user_id_idx", ["userId"], {})
@Entity("order")
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true })
  orderId: number;

  @Column({ type: "enum", enum: ["accepted", "rejected", "pending"] })
  status: "accepted" | "rejected" | "pending";

  @Column({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;

  @OneToMany(() => Pizza, (pizza) => pizza.order)
  pizzas: Pizza[];
}
