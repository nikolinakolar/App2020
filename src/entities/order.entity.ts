import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";

@Index("uq_order_cart_id", ["cartId"], { unique: true })
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

  @OneToOne(() => Cart, (cart) => cart.order, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
  cart: Cart;
}

