import { ToppingController } from "src/controllers/api/topping.controller";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
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
  allergen: Allergen[];

  @ManyToMany(type => Allergen)
  @JoinTable({
    name: 'allergen',
    joinColumn: { name: 'pizza_id', referencedColumnName: 'pizzaId' },
    inverseJoinColumn: { name: 'allergen_id', referencedColumnName: 'allergenId' },
  })
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
  topping: Topping[];

  @ManyToMany(type => Topping)
  @JoinTable({
    name: 'topping',
    joinColumn: { name: 'pizza_id', referencedColumnName: 'pizzaId' },
    inverseJoinColumn: { name: 'topping_id', referencedColumnName: 'toppingId' },
  })
  toppings: Topping[];

  @OneToMany(() => Photo, (photo) => photo.pizza)
  photos: Photo[];
}
