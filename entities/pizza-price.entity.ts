import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pizza } from "./pizza.entity";

@Index("fk_pizza_price_pizza_id_idx", ["pizzaId"], {})
@Entity("pizza_price")
export class PizzaPrice {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "pizza_price_id",
    unsigned: true,
  })
  pizzaPriceId: number;

  @Column({ type: "decimal", precision: 10, scale: 0 })
  price: number;

  @Column({ type: "int", name: "pizza_id", unsigned: true })
  pizzaId: number;

  @ManyToOne(() => Pizza, (pizza) => pizza.pizzaPrices, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "pizza_id", referencedColumnName: "pizzaId" }])
  pizza: Pizza;
}
