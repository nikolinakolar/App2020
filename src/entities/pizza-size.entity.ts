import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pizza } from "./pizza.entity";

@Index("fk_pizza_size_pizza_id_idx", ["pizzaId"], {})
@Index("name_UNIQUE", ["name"], { unique: true })
@Entity("pizza_size")
export class PizzaSize {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "pizza_size_id",
    unsigned: true,
  })
  pizzaSizeId: number;

  @Column({ type: "varchar", unique: true, length: 64 })
  name: string;

  @Column({ type: "int", unsigned: true })
  size: number;

  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 0 })
  price: number;

  @Column({ type: "int", name: "pizza_id", unsigned: true })
  pizzaId: number;

  @ManyToOne(() => Pizza, (pizza) => pizza.pizzaSizes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "pizza_id", referencedColumnName: "pizzaId" }])
  pizza: Pizza;
}
