export class EditPizzaDto {
    name: string;
    description: string;
    price: number;
    size: number;
    toppings: {
        toppingId: number;
      }[] | null;
      allergens: {
        allergenId: number;
      }[] | null;   
}