import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/boards/boards.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module.js';
import { ProductModule } from './apis/products/product.module.js';
import { UserModule } from './apis/users/user.module.js';
import { AuthModule } from './apis/auth/auth.module.js';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module.js';
import { FileModule } from './apis/file/file.module'

@Module({
    imports: [
        AuthModule,
        BoardModule,
        FileModule,
        PointTransactionModule,
        ProductCategoryModule,
        ProductModule,
        UserModule,


        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({req, res}) => ({req,res}),
        }),
        
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '10.85.16.3',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'myserver02',
            entities: [__dirname+ '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
        }),
    ],
})
export class AppModule {}
