import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StarbucksModule } from './apis/menus/menus.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starbucks } from './apis/menus/entities/menu.entity.js';

// 하위 api들을 모두 모아서 import 해주는 역할

@Module({
  imports: [
    StarbucksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qwer1234!',
      database: 'myproject02',
      entities: [Starbucks],
      synchronize: true,
      logging: true,
      retryAttempts: 30,
    }),
  ],
})
export class AppModule {}
