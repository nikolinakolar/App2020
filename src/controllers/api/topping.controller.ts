import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Topping } from "entities/topping.entity";
import { ToppingService } from "src/services/topping/topping.service";

@Controller('api/topping')
@Crud({
    model: {
        type: Topping
    },
    params: {
        id: {
            field: 'toppingId',
            type: 'number',
            primary: true
        }
    } ,
    query: {
        join: {
            allergens: {
                eager: true
            },
            pizza: {
                eager: true
            }
        }
    }
})
export class ToppingController {
    constructor( public service: ToppingService) { }
}
