import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Repository } from 'typeorm';
import { PizzaCart } from 'src/entities/pizza-cart.entity';
import { Pizza } from 'src/entities/pizza.entity';
import { AddPizzaCartDto } from 'src/dtos/cart/add.pizza.cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cart: Repository<Cart>,

    @InjectRepository(PizzaCart)
    private readonly pizzaCart: Repository<PizzaCart>,

    @InjectRepository(Pizza)
    private readonly pizza: Repository<Pizza>
  ){}

  async createCart(): Promise<Cart> {

    const newCart: Cart = new Cart()

    return await this.cart.save(newCart)
  }

  async addPizzasToCart(cartId: number, data: AddPizzaCartDto): Promise<Cart> {

    let price = 0

    for (let pizza of data.pizzas) {
      let newPizzaCart: PizzaCart = new PizzaCart();
      newPizzaCart.cartId = cartId;
      newPizzaCart.pizzaId = pizza.pizzaId;
      newPizzaCart.quantity = pizza.quantity;

      price += pizza.price;

      await this.pizzaCart.save(newPizzaCart);
    }
    
      let cart = await this.getCartById(cartId);

      cart.price += price;

      return await this.cart.save(cart);
  }
  
  async getCartById(cartId: number): Promise<Cart> {
    return this.cart.findOne(cartId, {
      relations: [
        "pizzaCarts",
        "pizzaCarts.pizza"
      ]
    })
  }
}
