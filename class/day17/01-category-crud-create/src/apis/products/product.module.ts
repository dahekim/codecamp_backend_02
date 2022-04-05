import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

@Module({
    // entity~Repository 는 import에 주입
    imports: [ TypeOrmModule.forFeature( [Product] ) ],
    
    providers :[
        ProductService, 
        ProductResolver,
    ]
})
export class ProductModule{

}