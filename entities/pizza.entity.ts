import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Allergen } from "./allergen.entity";
import { Order } from "./order.entity";
import { Photo } from "./photo.entity";
import { PizzaPrice } from "./pizza-price.entity";
import { PizzaSize } from "./pizza-size.entity";
import { Topping } from "./topping.entity";

@Index("fk_pizza_order_id_idx", ["orderId"], {})
@Index("name_UNIQUE", ["name"], { unique: true })
@Entity("pizza")
export class Pizza {
  @PrimaryGeneratedColumn({ type: "int", name: "pizza_id", unsigned: true })
  pizzaId: number;

  @Column({ type: "varchar", unique: true, length: 64 })
  name: string;

  @Column({ type: "text"})
  decription: string;


  @Column({ type: "int", name: "order_id", unsigned: true })
  orderId: number;

  @OneToMany(() => Allergen, (allergen) => allergen.pizza)
  allergens: Allergen[];

  @ManyToOne(() => Order, (order) => order.pizzas, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Order;

  @OneToMany(() => PizzaPrice, (pizzaPrice) => pizzaPrice.pizza)
  pizzaPrices: PizzaPrice[];

  @OneToMany(() => PizzaSize, (pizzaSize) => pizzaSize.pizza)
  pizzaSizes: PizzaSize[];

  @OneToMany(() => Topping, (topping) => topping.pizza)
  toppings: Topping[];

  @OneToMany(() => Photo, (photo) => photo.pizza)
  photos: Photo[];
}
