import { Controller, Post, Body } from "@nestjs/common";
import { CartService } from "src/services/cart/cart.service";
import { Cart } from "src/entities/cart.entity";
import { AddPizzaCartDto } from "src/dtos/cart/add.pizza.cart.dto";

@Controller('api/cart')
export class CartController {
    constructor(public service: CartService) { }

    @Post('createCart')
    async createCart(@Body() data: AddPizzaCartDto): Promise<Cart | null> {

      if (data.pizzas.length === 0) return null

      const cart = await this.service.createCart()
      
      console.log(cart)

      return await this.service.addPizzasToCart(cart.cartId, data)
    }
}