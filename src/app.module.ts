import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import PostsModule from './posts/posts.module';
import * as Joi from '@hapi/joi';
import { AuthenticationModule } from './authentication/authentication.module';
import CategoriesModule from './categories/categories.module';
import SeriesModule from './series/series.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // validationSchema: Joi.object({
      //   MONGO_USERNAME: Joi.string().required(),
      //   MONGO_PASSWORD: Joi.string().required(),
      //   MONGO_DATABASE: Joi.string().required(),
      //   MONGO_HOST: Joi.string().required(),
      // }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {

        return {
          uri: `mongodb://localhost:27017`,
          dbName: 'myDb',
        };
      },
      inject: [ConfigService],
    }),
    PostsModule,
    AuthenticationModule,
    CategoriesModule,
    SeriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
