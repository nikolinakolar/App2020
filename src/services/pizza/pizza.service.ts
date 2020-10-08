import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Pizza } from "entities/pizza.entity";

@Injectable()
export class PizzaService extends TypeOrmCrudService<Pizza> {
    constructor(@InjectRepository(Pizza) private readonly pizza: Repository<Pizza>){
        super(pizza);
    }
}