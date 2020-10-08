import { Module } from '@nestjs/common';
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
        User 
      ]
    }),
    TypeOrmModule.forFeature([ 
      Administrator,
      Topping,
      Pizza,
    ])
  ],
  controllers: [
    AppController,
    AdministratorController,
    ToppingController,
    PizzaController,
  ],
  providers: [
    AdministratorService,
    ToppingService,
    PizzaService,
  ],
})
export class AppModule {}
