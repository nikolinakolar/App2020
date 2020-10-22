import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllergenImage } from 'src/entities/allergen-image.entity';

@Injectable()
export class AllergenImageService extends TypeOrmCrudService<AllergenImage> {
  constructor(@InjectRepository(AllergenImage) private readonly allergenImage: Repository<AllergenImage>) {
    super(allergenImage)
  }
}