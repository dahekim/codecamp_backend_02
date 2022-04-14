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
import { AuthModule } from './apis/auth/auth.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';


@Module({
    imports: [
        AuthModule,
        BodypartModule,
        GenreModule,
        LocationModule,
        TattooModule,
        TypeModule,
        PointTransactionModule,
        UserModule,

        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({req, res}) => ({req,res}),
        }),
        
        TypeOrmModule.forRoot({
            type: 'mysql',
            //host: 'my-database',
            host: 'localhost',
            port: 3306,
            username: 'root',
            //password: 'root',
            password: 'qwer1234',
            //database: 'mydocker02',
            database: 'myproject02',
            entities: [__dirname+ '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
        }),
    ],
})
export class AppModule {}
