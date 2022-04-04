import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/boards/boards.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/boards/entities/board.entity.js';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// 하위 api들을 모두 모아서 import 해주는 역할

@Module({
    imports: [
        BoardModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'qwer1234',
            database: 'myproject02',
            entities: [__dirname+ '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
        }),
    ],
})
export class AppModule {}
