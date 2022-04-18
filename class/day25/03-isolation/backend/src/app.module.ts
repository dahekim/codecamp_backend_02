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
import { PaymentModule } from './apis/payment/payment.module.js'

@Module({
    imports: [
        AuthModule,
        BoardModule,
        PaymentModule,
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