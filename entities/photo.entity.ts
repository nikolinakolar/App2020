import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Pizza } from "./pizza.entity";
  
  @Index("fk_photo_pizza_id_idx", ["pizzaId"], {})
  @Index("uq_photo_image_path", ["imagePath"], { unique: true })
  @Entity("photo")
  export class Photo {
    @PrimaryGeneratedColumn({
      type: "int",
      name: "photo_id",
      unsigned: true,
    })
    photoId: number;
  
    @Column({ type: "int", name: "pizza_id", unsigned: true})
    pizzaId: number;
  
    @Column({ type: "varchar", name: "image_path", unique: true, length: 128 })
    imagePath: string;
  
    @ManyToOne(() => Pizza, (pizza) => pizza.photos, {
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    })
    
    @JoinColumn([{ name: "pizza_id", referencedColumnName: "pizzaId" }])
    pizza: Pizza;
  }