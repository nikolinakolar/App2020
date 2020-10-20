import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseCongiduration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { AllergenImage } from 'entities/allergen-image.entity';
import { Allergen } from 'entities/allergen.entity';
import { Order } from 'entities/order.entity';
import { PizzaPrice } from 'entities/pizza-price.entity';
import { PizzaSize } from 'entities/pizza-size.entity';
import { Pizza } from 'entities/pizza.entity';
import { Topping } from 'entities/topping.entity';
import { User } from 'entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { ToppingController } from './controllers/api/topping.controller';
import { ToppingService } from './services/topping/topping.service';
import { PizzaService } from './services/pizza/pizza.service';
import { PizzaController } from './controllers/api/pizza.controller';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { Photo } from 'entities/photo.entity';
import { PhotoService } from './services/photo/photo.service';


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
  ],
  providers: [
    AdministratorService,
    ToppingService,
    PizzaService,
    PhotoService,
  ],
  exports: [
    AdministratorService,
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
