import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import {  } from "src/entities/allergen-image.entity";
import { ToppingImage } from "src/entities/topping-image.entity";
import { ToppingImageService } from "src/services/toppingImage/toppingimage.service";


@Controller('api/toppingimage')
@Crud({
    model: { type: ToppingImage },
    params: {
        id: { field: 'toppingImageId', type: 'number', primary: true }
    },
    query: {
        join: {
          topping: {
            eager: true
          }
        },
    },
})
export class ToppingImageController {
    constructor(public service: ToppingImageService) { }
}