import { 
    Column, 
    Entity, 
    Index, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn } from "typeorm";
  import { Topping } from "./topping.entity";
  
  @Index("fk_topping_image_topping_id_idx", ["toppingId"], {})
  @Index("uq_topping_image_image_path", ["imagePath"], { unique: true })
  @Entity("toppingImage")
  export class ToppingImage {
    @PrimaryGeneratedColumn({
      type: "int",
      name: "topping_image_id",
      unsigned: true,
    })
    toppingImageId: number;
  
    @Column({ type: "int", name: "topping_id", unsigned: true})
    toppingId: number;
  
    @Column({ type: "varchar", name: "image_path", unique: true, length: 128 })
    imagePath: string;
  
    @ManyToOne(() => Topping, (topping) => topping.toppingImage, {
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    })
    
    @JoinColumn([{ name: "topping_id", referencedColumnName: "toppingId" }])
    topping: Topping;
  }