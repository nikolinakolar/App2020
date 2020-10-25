import { Controller, Delete, Param, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Allergen } from "src/entities/allergen.entity";
import { AllergenService } from "src/services/allergen/allergen.service";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { diskStorage } from "multer";
import { AllergenImageService } from "src/services/allergenimage/allergenimage.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { StorageConfig } from "config/storage.config";
import { AllergenImage } from "src/entities/allergen-image.entity";
import { ApiResponse } from "src/misc/api.response.class";


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
    constructor(
      public service: AllergenService,
      public allergenImageService: AllergenImageService
      ) { }

      @Post(':id/uploadAllergenImage') // POST http://localhost:3000/api/allergen/:id/uploadAllergenImage/
      @UseInterceptors(
          FileInterceptor('allergenImage', {
              storage: diskStorage({
                  destination: StorageConfig.allergenImage.directory,
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
                      fileSize: StorageConfig.allergenImage.photoMaxFileSize
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
      async uploadPhoto(@Param('id') allergenId: number, @UploadedFile() allergenImage, @Req() req): Promise<AllergenImage | ApiResponse> {
          
  
          if (req.fileFilterError !== undefined) {
              return new ApiResponse('error', -4001, req.fileFilterError);
          }
  
          if (!allergenImage) {
              return new ApiResponse('error', -4002, 'Bad file extension!');
          }
  
          const fileTypeResult = await fileType.fromFile(allergenImage.path);
          if (!fileTypeResult) {
              fs.unlinkSync(allergenImage.path);
              return new ApiResponse('error', -4003, 'Wrong file content');
          }
  
          const realMimeType: string = fileTypeResult.mime;
          if (!(realMimeType.includes('jpeg') || realMimeType.includes('png'))) {
              fs.unlinkSync(allergenImage.path);
              return new ApiResponse('error', -4004, 'Wrong file content');
          }
  
          await this.createResizedImage(allergenImage, StorageConfig.allergenImage.resize.square);
  
          const newAllergenImage: AllergenImage = new AllergenImage();
          newAllergenImage.allergenId = allergenId;
          newAllergenImage.imagePath = allergenImage.filename;
  
          const savedAllergenImage = await this.allergenImageService.add(newAllergenImage);
  
          if (!savedAllergenImage) {
              return new ApiResponse('error', -4005, 'photo not saved');
          }
  
          return savedAllergenImage;
      }
  
      async createResizedImage(allergenImage, resizeOptions) {
          const destination = StorageConfig.allergenImage.directory + resizeOptions.directory + allergenImage.filename;         
  
          await sharp(allergenImage.path).resize({ fit: 'cover', width: resizeOptions.width, height: resizeOptions.height }).toFile(destination);
  
      }
  
      @Delete(':allergenId/deletePhoto/:allergenImageId')
      async deletePhoto(
          @Param('allergenId') allergenId: number,
          @Param('allergenImageId') allergenImageId: number
      ) {
          const allergenImage = await this.allergenImageService.findOne({
              allergenImageId: allergenImageId,
              allergenId: allergenId
          });
  
          if (!allergenImage) {
              return new ApiResponse("error", -4006, 'Photo not found.');
          }
  
          try {
              fs.unlinkSync(StorageConfig.allergenImage.directory + allergenImage.imagePath);
              fs.unlinkSync(StorageConfig.allergenImage.directory +
                            StorageConfig.allergenImage.resize.square.directory +
                            allergenImage.imagePath);
          } catch (e) { }
  
          const deleteResult = await this.allergenImageService.deleteById(allergenImageId);
          if (!deleteResult.affected) {
              return new ApiResponse("error", -4007, 'Photo not found.');
          }
  
          return new ApiResponse("ok", 0, 'One photo has been deleted.');
      }
  
  }
