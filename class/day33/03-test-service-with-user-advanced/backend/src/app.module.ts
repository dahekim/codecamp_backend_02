import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/boards/boards.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module.js';
import { ProductModule } from './apis/products/product.module.js';
import { UserModule } from './apis/users/user.module.js';
import { AuthModule } from './apis/auth/auth.module.js';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module.js';
import { FileModule } from './apis/file/file.module'
import type { RedisClientOptions} from 'redis'
import * as redisStore from 'cache-manager-redis-store'

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
            //host: 'localhost',
            host: 'my-database',
            port: 3306,
            username: 'root',
            // password: 'qwer1234',
            password: 'root',
            // database: 'myproject02',
            database: 'mydocker02',
            entities: [__dirname+ '/apis/**/*.entity.*'],
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
