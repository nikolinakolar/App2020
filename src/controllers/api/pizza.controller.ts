import { Body, Controller, Delete, Param, Patch, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Crud } from "@nestjsx/crud";
import { StorageConfig } from "config/storage.config";
import { Pizza } from "src/entities/pizza.entity";
import { AddPizzaDto } from "src/dtos/pizza/add.pizza.dto";
import { PizzaService } from "src/services/pizza/pizza.service";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { Photo } from "src/entities/photo.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { PhotoService } from "src/services/photo/photo.service";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { EditPizzaDto } from "src/dtos/pizza/edit.pizza.dto";

@Controller('api/pizza')
@Crud({
    model: {
        type: Pizza
    },
    params: {
        id: {
            field: 'pizzaId',
            type: 'number',
            primary: true
        }
    } ,
    query: {
        join: {
            allergens: {
                eager: true
            },
            order: {
                eager: true
            },
            pizzaPrices: {
                eager: true
            },
            pizzaSizes: {
                eager: true
            },
            toppings: {
                eager: true
            },
            photos: {
                eager: true
            }
            
        }
    },
    routes: {
        exclude: [ 'updateOneBase', 'replaceOneBase', 'deleteOneBase'],
    }
})
export class PizzaController {
    constructor( 
        public service: PizzaService,
        public photoService: PhotoService
        ) { }

    @Post('createFull') // POST http://localhost:3000/api/pizza/createFull/
    createFullPizza( @Body() data: AddPizzaDto) {
       return this.service.createFullPizza(data);
        
    }

    @Patch(':id')
    async editById(@Param('id') id: number, @Body() data: EditPizzaDto) {
        return await this.service.editPizza(id, data);
    }

    @Post(':id/uploadPhoto') // POST http://localhost:3000/api/pizza/:id/uploadPhoto/
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: StorageConfig.photo.directory,
                filename: (req, file, cb) => {

                    let original = file.originalname

                    let normalized = original.toLowerCase().replace(/\s+/g, '-')
                    normalized = normalized.replace(/[^a-z0-9\.\-]/g, '');
                    let now = new Date()
                    let datePart = ''
                    datePart += now.getFullYear().toString()
                    datePart += (now.getMonth() + 1).toString()
                    datePart += now.getDate().toString()

                    const randomPart: string = new Array(10).fill(0).map(e => (Math.random() * 9).toFixed(0).toString()).join('');

                    let fileName = datePart + '-' + randomPart + '-' + normalized;

                    cb(null, fileName);
                },

                limits: {
                    files: 1,
                    fileSize: StorageConfig.photo.photoMaxFileSize
                }
            }),
            fileFilter: (req, file, cb) => {

                if (!file.originalname.toLowerCase().match(/\.(jpg|png)$/)) {
                    req.fileFilterError = 'Wrong file extension';
                    cb(null, false);
                    return;
                }

                if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
                    req.fileFilterError = 'Wrong file content';
                    cb(null, false);
                    return;
                }

                cb(null, true);
            }
        })
    )
    async uploadPhoto(@Param('id') pizzaId: number, @UploadedFile() photo, @Req() req): Promise<Photo | ApiResponse> {
        

        if (req.fileFilterError !== undefined) {
            return new ApiResponse('error', -4001, req.fileFilterError);
        }

        if (!photo) {
            return new ApiResponse('error', -4002, 'Bad file extension!');
        }

        const fileTypeResult = await fileType.fromFile(photo.path);
        if (!fileTypeResult) {
            fs.unlinkSync(photo.path);
            return new ApiResponse('error', -4003, 'Wrong file content');
        }

        const realMimeType: string = fileTypeResult.mime;
        if (!(realMimeType.includes('jpeg') || realMimeType.includes('png'))) {
            fs.unlinkSync(photo.path);
            return new ApiResponse('error', -4004, 'Wrong file content');
        }

        await this.createResizedImage(photo, StorageConfig.photo.resize.square);

        const newPhoto: Photo = new Photo();
        newPhoto.pizzaId = pizzaId;
        newPhoto.imagePath = photo.filename;

        const savedPhoto = await this.photoService.add(newPhoto);

        if (!savedPhoto) {
            return new ApiResponse('error', -4005, 'photo not saved');
        }

        return savedPhoto;
    }

    async createResizedImage(photo, resizeOptions) {
        const destination = StorageConfig.photo.directory + resizeOptions.directory + photo.filename;         

        await sharp(photo.path).resize({ fit: 'cover', width: resizeOptions.width, height: resizeOptions.height }).toFile(destination);

    }

    @Delete(':pizzaId/deletePhoto/:photoId')
    async deletePhoto(
        @Param('pizzaId') pizzaId: number,
        @Param('photoId') photoId: number
    ) {
        const photo = await this.photoService.findOne({
            photoId: photoId,
            pizzaId: pizzaId
        });

        if (!photo) {
            return new ApiResponse("error", -4006, 'Photo not found.');
        }

        try {
            fs.unlinkSync(StorageConfig.photo.directory + photo.imagePath);
            fs.unlinkSync(StorageConfig.photo.directory +
                          StorageConfig.photo.resize.square.directory +
                          photo.imagePath);
        } catch (e) { }

        const deleteResult = await this.photoService.deleteById(photoId);
        if (!deleteResult.affected) {
            return new ApiResponse("error", -4007, 'Photo not found.');
        }

        return new ApiResponse("ok", 0, 'One photo has been deleted.');
    }

}