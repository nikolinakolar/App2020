import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PizzaSize } from 'src/entities/pizza-size.entity';


@Injectable()
export class PizzaSizeService extends TypeOrmCrudService<PizzaSize> {
  constructor(@InjectRepository(PizzaSize) private readonly pizzaSize: Repository<PizzaSize>) {
    super(pizzaSize)
  }
}