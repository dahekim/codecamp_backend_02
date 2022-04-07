import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bodypart } from './apis/bodypart/entities/bodypart.entity';
import { Design } from './apis/design/entities/design.entity';
import { TattooLocation } from './apis/location/entities/location.entity';
import { Review } from './apis/review/entities/review.entity';
import { Tattoo } from './apis/tattoo/entities/tattoo.entity';
import { TattooModule } from './apis/tattoo/tattoo.module';
import { TattooGenre } from './apis/tattoo_genre/entities/tattooGenre.entity';
import { TattooType } from './apis/tattoo_type/entities/tattooType.entity';
import { Users } from './apis/users/entities/users.entity';
import { Method } from './apis/method/entities/method.entity';
import { DesignModule } from './apis/design/design.module';


// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// 하위 api들을 모두 모아서 import 해주는 역할

@Module({
    imports: [
        TattooModule,
        DesignModule,
        Method,

       
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
        }),

        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'my-database',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'mydocker02',
            entities: [Bodypart, Design, TattooLocation, Review, Tattoo, TattooType, Users, Method, TattooGenre, Review],
            synchronize: true,
            logging: true,
        }),
    ],
})
export class AppModule {}
