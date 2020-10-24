import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToppingImage } from 'src/entities/topping-image.entity';

@Injectable()
export class ToppingImageService extends TypeOrmCrudService<ToppingImage> {
  constructor(@InjectRepository(ToppingImage) private readonly toppingImage: Repository<ToppingImage>) {
    super(toppingImage)
  }
}