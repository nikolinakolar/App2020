import { Body, Controller, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Pizza } from "entities/pizza.entity";
import { AddPizzaDto } from "src/dtos/pizza/add.pizza.dto";
import { PizzaService } from "src/services/pizza/pizza.service";


@Controller('api/pizza')
@Crud({
    model: {
        type: Pizza
    },
    params: {
        id: {
            field: 'pizzaId',
            type: 'number',
            primary: true
        }
    } ,
    query: {
        join: {
            allergens: {
                eager: true
            },
            order: {
                eager: true
            },
            pizzaPrices: {
                eager: true
            },
            pizzaSizes: {
                eager: true
            },
            toppings: {
                eager: true
            }
            
        }
    }
})
export class PizzaController {
    constructor( public service: PizzaService) { }

    @Post('createFull') // POST http://localhost:3000/api/pizza/createFull/
    createFullPizza( @Body() data: AddPizzaDto) {
       return this.service.createFullPizza(data);
        
    }

}