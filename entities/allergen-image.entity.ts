import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Allergen } from "./allergen.entity";

@Index("allergen_id_UNIQUE", ["allergenId"], { unique: true })
@Index("fk_allergen_image_allergen_id_idx", ["allergenId"], {})
@Entity("allergen_image")
export class AllergenImage {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "allergen_image_id",
    unsigned: true,
  })
  allergenImageId: number;

  @Column({ type: "varchar", name: "image_path", length: 128 })
  imagePath: string;

  @Column({ type: "int", name: "allergen_id", unique: true, unsigned: true })
  allergenId: number;

  @OneToOne(() => Allergen, (allergen) => allergen.allergenImage, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "allergen_id", referencedColumnName: "allergenId" }])
  allergen: Allergen;
}
