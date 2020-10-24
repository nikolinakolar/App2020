import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Pizza } from "src/entities/pizza.entity";
import { AddPizzaDto } from "src/dtos/pizza/add.pizza.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { PizzaPrice } from "src/entities/pizza-price.entity";
import { Allergen } from "src/entities/allergen.entity";
import { ToppingController } from "src/controllers/api/topping.controller";
import { Topping } from "src/entities/topping.entity";
import { EditPizzaDto } from "src/dtos/pizza/edit.pizza.dto";
import { PizzaSize } from "src/entities/pizza-size.entity";

@Injectable()
export class PizzaService extends TypeOrmCrudService<Pizza> {
    constructor(
        @InjectRepository(Pizza) 
        private readonly pizza: Repository<Pizza>,
        
        @InjectRepository(PizzaPrice)
        private readonly pizzaPrice: Repository<PizzaPrice>,

        @InjectRepository(PizzaSize)
        private readonly pizzaSize: Repository<PizzaSize>,

        @InjectRepository(Allergen)
        private readonly allergen: Repository<Allergen>,

        @InjectRepository(Topping)
        private readonly topping: Repository<Topping>


    ){
        super(pizza);
    }

    async createFullPizza(data: AddPizzaDto): Promise<Pizza | ApiResponse> {
        let newPizza: Pizza = new Pizza();
        newPizza.name = data.name;
        newPizza.description = data.description;
        
       let savedPizza = await this.pizza.save(newPizza);
    
       let newPizzaPrice: PizzaPrice = new PizzaPrice(); 
        newPizzaPrice.pizzaId = savedPizza.pizzaId;
        newPizzaPrice.price = data.price;

        await this.pizzaPrice.save(newPizzaPrice);

        let newPizzaSize: PizzaSize = new PizzaSize(); 
        newPizzaSize.pizzaId = savedPizza.pizzaId;
        newPizzaSize.size = data.size;

        await this.pizzaSize.save(newPizzaSize);


        for (let allergen of data.allergens) {
            let newAllergen: Allergen = new Allergen();
            newAllergen.pizzaId = savedPizza.pizzaId;
            newAllergen.allergenId = allergen.allergenId;
      
            await this.allergen.save(newAllergen);
          }
      
          for (let topping of data.toppings) {
            let newTopping: Topping = new Topping();
            newTopping.pizzaId = savedPizza.pizzaId;
            newTopping.toppingId = topping.toppingId;
      
            await this.topping.save(newTopping);
          }

        return await this.pizza.findOne(savedPizza.pizzaId, {
            relations: [
                "pizzaSizes",
                "toppings",
                "allergens",
                "pizzaPrices"
            ]

        });

    }

    async editPizza(pizzaId: number, data: EditPizzaDto): Promise<Pizza | ApiResponse> {
        let existingPizza: Pizza = await this.pizza.findOne(pizzaId, {
            relations: ['pizzaPrices', 'pizzaSizes', 'toppings', 'allergens']
          })
    
        if(!existingPizza) {
          return new ApiResponse('error', -5001, 'Article not found')
        }
    
        existingPizza.name = data.name;
        existingPizza.description = data.description;
        
    
        const savedPizza: Pizza = await this.pizza.save(existingPizza);
        if (!savedPizza) {
            return new ApiResponse('error', -5002, 'Could not save new pizza.');
        }

        const newPriceString: string = Number(data.price).toFixed(2);

        const lastPrice = existingPizza.pizzaPrices[existingPizza.pizzaPrices.length-1].price
        const lastPriceString: string = Number(lastPrice).toFixed(2);

        if (newPriceString !== lastPriceString) {
          const newPizzaPrice = new PizzaPrice();
          newPizzaPrice.pizzaId = pizzaId;
          newPizzaPrice.price = data.price;

          const savedPizzaPrice = await this.pizzaPrice.save(newPizzaPrice);
          if(!savedPizzaPrice) {
            return new ApiResponse('error', -5003, 'Could not save the new pizza price');
          }
        }


        let newPizzaSize: PizzaSize = new PizzaSize(); 
        newPizzaSize.pizzaId = savedPizza.pizzaId;
        newPizzaSize.size = data.size; // ???

        await this.pizzaSize.save(newPizzaSize);
        
        if (data.allergens !== null) {
          await this.allergen.remove(existingPizza.allergens)
    
          for (let allergen of data.allergens) {
            let newAllergen: Allergen = new Allergen();
            newAllergen.pizzaId = pizzaId;
            newAllergen.allergenId = allergen.allergenId;
    
            await this.allergen.save(newAllergen);
          }
        }
    
        if (data.toppings !== null) {
          await this.topping.remove(existingPizza.toppings)
    
          for (let topping of data.toppings) {
            let newTopping: Topping = new Topping();
            newTopping.pizzaId = pizzaId;
            newTopping.toppingId = topping.toppingId;
    
            await this.topping.save(newTopping);
          }
        }
    
        return await this.pizza.findOne(pizzaId, {
          relations: [
            "pizzaSizes",
            "toppings",
            "allergens",
            "pizzaPrices"
          ]
        });
      }
    }
