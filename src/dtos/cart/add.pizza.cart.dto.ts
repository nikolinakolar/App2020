export class AddPizzaCartDto {
    pizzas: {
      pizzaId: number;
      quantity: number;
      price: number;
    }[]
  }