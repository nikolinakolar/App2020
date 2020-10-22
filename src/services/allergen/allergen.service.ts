import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allergen } from 'src/entities/allergen.entity';

@Injectable()
export class AllergenService extends TypeOrmCrudService<Allergen> {
  constructor(@InjectRepository(Allergen) private readonly allergen: Repository<Allergen>) {
    super(allergen)
  }
}