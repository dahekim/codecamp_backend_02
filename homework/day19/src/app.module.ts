import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooModule } from './apis/tattoo/tattoo.module';
import { BodypartModule } from './apis/bodypart/bodypart.module';
import { GenreModule } from './apis/tattoo_genre/genre.module'
import { LocationModule } from './apis/location/location.module';
import { TypeModule } from './apis/tattoo_type/type.module';
import { UserModule } from './apis/users/users.module'


@Module({
    imports: [
        TattooModule,
        BodypartModule,
        LocationModule,
        GenreModule,
        TypeModule,
        UserModule,
        


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
            entities: [__dirname+ '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
        }),
    ],
})
export class AppModule {}
