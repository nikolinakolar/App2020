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
import { Pizza } from "./pizza.entity";

@Index("fk_topping_pizza_id_idx", ["pizzaId"], {})
@Index("name_UNIQUE", ["name"], { unique: true })
@Entity("topping")
export class Topping {
  @PrimaryGeneratedColumn({ type: "int", name: "topping_id", unsigned: true })
  toppingId: number;

  @Column({ type: "varchar", unique: true, length: 64 })
  name: string;

  @Column({ type: "varchar", name: "image_path", length: 128 })
  imagePath: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 0 })
  price: number;

  @Column({ type: "int", name: "pizza_id", unsigned: true })
  pizzaId: number;

  @OneToMany(() => Allergen, (allergen) => allergen.topping)
  allergens: Allergen[];

  @ManyToOne(() => Allergen, (pizza) => pizza.topping, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "pizza_id", referencedColumnName: "pizzaId" }])
  pizza: Pizza;
}
