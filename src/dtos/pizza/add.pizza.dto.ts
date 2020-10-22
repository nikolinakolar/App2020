export class AddPizzaDto {
    name: string;
    description: string;
    price: number;
    size: number;
    toppings: {
        toppingId: number;
      }[];
      allergens: {
        allergenId: number;
      }[];   
}