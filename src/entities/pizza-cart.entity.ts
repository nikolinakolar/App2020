import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Cart } from "./cart.entity";
  import { Pizza } from "./pizza.entity";
  
  @Index("uq_pizza_cart_pizza_id_cart_id", ["pizzaId", "cartId"], {
    unique: true,
  })
  @Index("fk_pizza_cart_cart_id", ["cartId"], {})
  @Entity("pizza_cart")
  export class PizzaCart {
    @PrimaryGeneratedColumn({
      type: "int",
      name: "pizza_cart_id",
      unsigned: true,
    })
    pizzaCartId: number;
  
    @Column("int", { name: "pizza_id", unsigned: true })
    pizzaId: number;
  
    @Column("int", { name: "cart_id", unsigned: true })
    cartId: number;
  
    @Column("int", { unsigned: true })
    quantity: number;
  
    @ManyToOne(() => Cart, (cart) => cart.pizzaCarts, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
    cart: Cart;
  
    @ManyToOne(() => Pizza, (pizza) => pizza.pizzaCarts, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "pizza_id", referencedColumnName: "pizzaId" }])
    pizza: Pizza;
  }
  