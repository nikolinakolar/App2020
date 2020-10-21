import { InjectRepository } from "@nestjs/typeorm";
import { Topping } from "src/entities/topping.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

@Injectable()
export class ToppingService extends TypeOrmCrudService<Topping> {
    constructor(@InjectRepository(Topping) private readonly topping: Repository<Topping>){
        super(topping);
    }
}