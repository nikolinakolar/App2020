import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Pizza } from "src/entities/pizza.entity";
import { AddPizzaDto } from "src/dtos/pizza/add.pizza.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { PizzaPrice } from "src/entities/pizza-price.entity";
import { Allergen } from "src/entities/allergen.entity";

@Injectable()
export class PizzaService extends TypeOrmCrudService<Pizza> {
    constructor(
        @InjectRepository(Pizza) 
        private readonly pizza: Repository<Pizza>,
        
        @InjectRepository(PizzaPrice)
        private readonly pizzaPrice: Repository<PizzaPrice>,


        /*@InjectRepository(Allergen)
        private readonly allergen: Repository<Allergen>,*/


    ){
        super(pizza);
    }

    async createFullPizza(data: AddPizzaDto): Promise<Pizza | ApiResponse> {
        let newPizza: Pizza = new Pizza();
        newPizza.name = data.name;
        newPizza.decription = data.description;
        
       let savedPizza = await this.pizza.save(newPizza);
    
       let newPizzaPrice: PizzaPrice = new PizzaPrice(); 
        newPizzaPrice.pizzaId = savedPizza.pizzaId;
        newPizzaPrice.price = data.price;

        await this.pizzaPrice.save(newPizzaPrice);

        /*let newAllergen: Allergen = new Allergen();
        newAllergen.pizzaId = savedPizza.pizzaId;
        newAllergen.allergenId = data.allergens;

        this.allergen.save(newAllergen);*/

        return await this.pizza.findOne(savedPizza.pizzaId, {
            relations: [
                "pizzaSizes",
                "toppings",
                "pizzaPrices"
            ]

        });

    }
}