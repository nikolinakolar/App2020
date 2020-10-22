import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { AllergenImage } from "src/entities/allergen-image.entity";
import { AllergenImageService } from "src/services/allergenimage/allergenimage.service";


@Controller('api/allergenimage')
@Crud({
    model: { type: AllergenImage },
    params: {
        id: { field: 'allergenImageId', type: 'number', primary: true }
    },
    query: {
        join: {
          allergens: {
            eager: true
          }
        },
    },
})
export class AllergenImageController {
    constructor(public service: AllergenImageService) { }
}