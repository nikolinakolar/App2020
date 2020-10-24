import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pizza } from "./pizza.entity";


@Entity("order")
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true })
  orderId: number;

  @Column({ type: "enum", enum: ["accepted", "rejected", "pending"] })
  status: "accepted" | "rejected" | "pending";

  @Column("varchar", { name: "customer_name", length: 64 })
  customerName: string;

  @Column("varchar", { name: "customer_address", length: 200 })
  customerAddress: string;

  @Column("varchar", {
    name: "customer_phone",
    length: 64
  })
  customerPhone: string;

  @OneToMany(() => Pizza, (pizza) => pizza.order)
  pizzas: Pizza[];
}
