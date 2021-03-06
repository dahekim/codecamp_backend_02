import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TattooModule } from './apis/tattoo/tattoo.module';
import { BodypartModule } from './apis/bodypart/bodypart.module';
import { GenreModule } from './apis/tattoo_genre/genre.module';
import { LocationModule } from './apis/location/location.module';
import { TypeModule } from './apis/tattoo_type/type.module';
import { UserModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { TransactionModule } from './apis/transaction/transaction.module';
import { FileModule } from './apis/file/file.module';
import { ImageModule } from './apis/image/image.module';

import type { RedisClientOptions } from 'redis'
import * as redisStore from 'cache-manager-redis-store'

@Module({
  imports: [
    AuthModule,
    BodypartModule,
    FileModule,
    GenreModule,
    ImageModule,
    LocationModule,
    TattooModule,
    TypeModule,
    TransactionModule,
    UserModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database',
      // host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      // password: 'qwer1234',
      database: 'mydocker02',
      // database: 'myproject02',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),

    CacheModule.register<RedisClientOptions>({
        store: redisStore,
        url: 'redis://my-redis:6379',
        isGlobal: true,
    })
  ],
})
export class AppModule {}
