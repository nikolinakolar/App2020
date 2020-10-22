import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Allergen } from "src/entities/allergen.entity";
import { AllergenService } from "src/services/allergen/allergen.service";


@Controller('api/allergen')
@Crud({
    model: { type: Allergen },
    params: {
        id: { field: 'allergenId', type: 'number', primary: true }
    },
    query: {
        join: {
          allergens: {
            eager: true
          },
          pizza: {
            eager: true
          },
          allergenImage: {
              eager: true
          }
        },
    },
})
export class AllergenController {
    constructor(public service: AllergenService) { }
}