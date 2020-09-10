import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column({ type: "varchar", length: 64 })
  forename: string;

  @Column({ type: "varchar", length: 64 })
  surname: string;

  @Column({ type: "varchar", name: "phone_number", length: 24 })
  phoneNumber: string;

  @Column({ type: "text", name: "postal_address" })
  postalAddress: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
