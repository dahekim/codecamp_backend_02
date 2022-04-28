import { Module } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductSaleslocation } from "../productsSaleslocation/entities/productSaleslocation.entity";
import { ProductTag } from "../productTag/entities/productTag.entity";

import { Product } from "./entities/product.entity";
import { ProductSubscriber } from "./entities/product.subscriber";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

@Module({
    // entity~Repository 는 import에 주입
    imports: [ TypeOrmModule.forFeature( [ 
        Product, 
        ProductSaleslocation,
        ProductTag, ]),
        ElasticsearchModule.register({
            node: "http://elasticsearch:9200"
        }),
    ],
    
    providers :[
        ProductService, 
        ProductResolver,
        ProductSubscriber,
    ]
})
export class ProductModule{ }