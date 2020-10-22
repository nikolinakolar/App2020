import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { PizzaPrice } from "src/entities/pizza-price.entity";
import { PizzaPriceService } from "src/services/pizzaprice/pizzaprice.service";


@Controller('api/pizzaprice')
@Crud({
    model: { type: PizzaPrice },
    params: {
        id: { field: 'pizzaPriceId', type: 'number', primary: true }
    },
    query: {
        join: {
          pizza: {
            eager: true
          }
        },
    },
})
export class PizzaPriceController {
    constructor(public service: PizzaPriceService) { }
}