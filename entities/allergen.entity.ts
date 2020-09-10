import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AllergenImage } from "./allergen-image.entity";
import { Pizza } from "./pizza.entity";
import { Topping } from "./topping.entity";

@Index("fk_allergen_pizza_id_idx", ["pizzaId"], {})
@Index("fk_allergen_topping_id_idx", ["toppingId"], {})
@Index("name_UNIQUE", ["name"], { unique: true })
@Entity("allergen")
export class Allergen {
  @PrimaryGeneratedColumn({ type: "int", name: "allergen_id", unsigned: true })
  allergenId: number;

  @Column({ type: "varchar", unique: true, length: 64 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "int", name: "topping_id", unsigned: true })
  toppingId: number;

  @Column({ type: "int", name: "pizza_id", unsigned: true })
  pizzaId: number;

  @OneToOne(() => AllergenImage, (allergenImage) => allergenImage.allergen)
  allergenImage: AllergenImage;

  @ManyToOne(() => Pizza, (pizza) => pizza.allergens, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "pizza_id", referencedColumnName: "pizzaId" }])
  pizza: Pizza;

  @ManyToOne(() => Topping, (topping) => topping.allergens, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "topping_id", referencedColumnName: "toppingId" }])
  topping: Topping;
}
