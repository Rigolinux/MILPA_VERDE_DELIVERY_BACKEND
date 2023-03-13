import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

//environment variables
import { ConfigModule } from '@nestjs/config';
import { envVarsSchema } from './config/joi.validation';
import { EnvConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: envVarsSchema,
    }),
    MongooseModule.forRoot(process.env.DBURL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
