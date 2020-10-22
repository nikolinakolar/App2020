import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PizzaPrice } from 'src/entities/pizza-price.entity';


@Injectable()
export class PizzaPriceService extends TypeOrmCrudService<PizzaPrice> {
  constructor(@InjectRepository(PizzaPrice) private readonly pizzaPrice: Repository<PizzaPrice>) {
    super(pizzaPrice)
  }
}