import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { PizzaSize } from "src/entities/pizza-size.entity";
import { PizzaSizeService } from "src/services/pizzasize/pizzasize.service";



@Controller('api/pizzasize')
@Crud({
    model: { type: PizzaSize },
    params: {
        id: { field: 'pizzaSizeId', type: 'number', primary: true }
    },
    query: {
        join: {
          pizza: {
            eager: true
          }
        },
    },
})
export class PizzaSizeController {
    constructor(public service: PizzaSizeService) { }
}