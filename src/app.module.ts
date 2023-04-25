import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

//environment variables
import { ConfigModule } from '@nestjs/config';
import { envVarsSchema } from './config/joi.validation';
import { EnvConfig } from './config/app.config';
import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: envVarsSchema,
    }),
    MongooseModule.forRoot(process.env.DBURL),
    UsersModule,
    AuthModule,
    ProductsModule,
    InventoryModule,
    SalesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
