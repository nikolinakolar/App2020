import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseCongiduration } from 'config/database.configuration';
import { Administrator } from 'src/entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { AllergenImage } from 'src/entities/allergen-image.entity';
import { Allergen } from 'src/entities/allergen.entity';
import { Order } from 'src/entities/order.entity';
import { PizzaPrice } from 'src/entities/pizza-price.entity';
import { PizzaSize } from 'src/entities/pizza-size.entity';
import { Pizza } from 'src/entities/pizza.entity';
import { Topping } from 'src/entities/topping.entity';
import { User } from 'src/entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { ToppingController } from './controllers/api/topping.controller';
import { ToppingService } from './services/topping/topping.service';
import { PizzaService } from './services/pizza/pizza.service';
import { PizzaController } from './controllers/api/pizza.controller';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { Photo } from 'src/entities/photo.entity';
import { PhotoService } from './services/photo/photo.service';
import { AllergenService } from './services/allergen/allergen.service';
import { PizzaSizeService } from './services/pizzasize/pizzasize.service';
import { PizzaPriceService } from './services/pizzaprice/pizzaprice.service';
import { PhotoController } from './controllers/api/photo.controller';
import { AllergenController } from './controllers/api/allergen.controller';
import { AllergenImageController } from './controllers/api/allergenimage.controller';
import { PizzaSizeController } from './controllers/api/pizzasize.controller';
import { PizzaPriceController } from './controllers/api/pizzaprice.controller';
import { AllergenImageService } from './services/allergenimage/allergenimage.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseCongiduration.hostname,
      port: 3306,
      username: databaseCongiduration.username,
      password: databaseCongiduration.password,
      database: databaseCongiduration.database,
      entities: [ 
        Administrator,
        AllergenImage,
        Allergen,
        Order,
        PizzaPrice,
        PizzaSize,
        Pizza,
        Topping,
        User,
        Photo
        
      ]
    }),
    TypeOrmModule.forFeature([ 
      Administrator,
        AllergenImage,
        Allergen,
        Order,
        PizzaPrice,
        PizzaSize,
        Pizza,
        Topping,
        User,
        Photo
    ])
  ],
  controllers: [
    AppController,
    AdministratorController,
    ToppingController,
    PizzaController,
    AuthController,
    PhotoController,
    AllergenController,
    AllergenImageController,
    PizzaSizeController,
    PizzaPriceController

  ],
  providers: [
    AdministratorService,
    ToppingService,
    PizzaService,
    PhotoService,
    AllergenService,
    PizzaSizeService,
    PizzaPriceService,
    AllergenImageService
  ],
  exports: [
    AdministratorService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude('auth/*')
    .forRoutes('api/*');
  }

}
