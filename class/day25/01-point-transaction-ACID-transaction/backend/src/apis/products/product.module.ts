import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductSaleslocation } from "../productsSaleslocation/entities/productSaleslocation.entity";
import { ProductTag } from "../productTag/entities/productTag.entity";

import { Product } from "./entities/product.entity";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

@Module({
    // entity~Repository 는 import에 주입
    imports: [ TypeOrmModule.forFeature( [ 
        Product, 
        ProductSaleslocation,
        ProductTag, ]) 
    ],
    
    providers :[
        ProductService, 
        ProductResolver,
    ]
})
export class ProductModule{ }