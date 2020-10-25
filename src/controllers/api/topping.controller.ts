import { Controller, Delete, Param, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Crud } from "@nestjsx/crud";
import { StorageConfig } from "config/storage.config";
import { ToppingImage } from "src/entities/topping-image.entity";
import { Topping } from "src/entities/topping.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { ToppingService } from "src/services/topping/topping.service";
import { ToppingImageService } from "src/services/toppingImage/toppingimage.service";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { diskStorage } from "multer";

@Controller('api/topping')
@Crud({
    model: {
        type: Topping
    },
    params: {
        id: {
            field: 'toppingId',
            type: 'number',
            primary: true
        }
    } ,
    query: {
        join: {
            allergens: {
                eager: true
            },
            pizza: {
                eager: true
            },
            toppingImage: {
                eager: true
            }
        }
    }
})
export class ToppingController {
    constructor( 
        public service: ToppingService,
        public toppingImageService: ToppingImageService
        ) { }

    @Post(':id/uploadToppingImage') // POST http://localhost:3000/api/topping/:id/uploadToppingImage/
    @UseInterceptors(
        FileInterceptor('toppingImage', {
            storage: diskStorage({
                destination: StorageConfig.toppingImage.directory,
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
                    fileSize: StorageConfig.toppingImage.photoMaxFileSize
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
    async uploadPhoto(@Param('id') toppingId: number, @UploadedFile() toppingImage, @Req() req): Promise<ToppingImage | ApiResponse> {
        

        if (req.fileFilterError !== undefined) {
            return new ApiResponse('error', -4001, req.fileFilterError);
        }

        if (!toppingImage) {
            return new ApiResponse('error', -4002, 'Bad file extension!');
        }

        const fileTypeResult = await fileType.fromFile(toppingImage.path);
        if (!fileTypeResult) {
            fs.unlinkSync(toppingImage.path);
            return new ApiResponse('error', -4003, 'Wrong file content');
        }

        const realMimeType: string = fileTypeResult.mime;
        if (!(realMimeType.includes('jpeg') || realMimeType.includes('png'))) {
            fs.unlinkSync(toppingImage.path);
            return new ApiResponse('error', -4004, 'Wrong file content');
        }

        await this.createResizedImage(toppingImage, StorageConfig.toppingImage.resize.square);

        const newToppingImage: ToppingImage = new ToppingImage();
        newToppingImage.toppingId = toppingId;
        newToppingImage.imagePath = toppingImage.filename;

        const savedToppingImage = await this.toppingImageService.add(newToppingImage);

        if (!savedToppingImage) {
            return new ApiResponse('error', -4005, 'photo not saved');
        }

        return savedToppingImage;
    }

    async createResizedImage(photo, resizeOptions) {
        const destination = StorageConfig.photo.directory + resizeOptions.directory + photo.filename;         

        await sharp(photo.path).resize({ fit: 'cover', width: resizeOptions.width, height: resizeOptions.height }).toFile(destination);

    }

    @Delete(':toppingId/deletePhoto/:toppingImageId')
    async deletePhoto(
        @Param('toppingId') toppingId: number,
        @Param('toppingImageId') toppingImageId: number
    ) {
        const toppingImage = await this.toppingImageService.findOne({
            toppingImageId: toppingImageId,
            toppingId: toppingId
        });

        if (!toppingImage) {
            return new ApiResponse("error", -4006, 'Photo not found.');
        }

        try {
            fs.unlinkSync(StorageConfig.toppingImage.directory + toppingImage.imagePath);
            fs.unlinkSync(StorageConfig.toppingImage.directory +
                          StorageConfig.toppingImage.resize.square.directory +
                          toppingImage.imagePath);
        } catch (e) { }

        const deleteResult = await this.toppingImageService.deleteById(toppingImageId);
        if (!deleteResult.affected) {
            return new ApiResponse("error", -4007, 'Photo not found.');
        }

        return new ApiResponse("ok", 0, 'One photo has been deleted.');
    }

}

