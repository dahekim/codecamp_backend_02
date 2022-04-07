import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCategory } from "./entities/productCategory.entity";
import { ProductCategoryResolver } from "./method.resolver";
import { ProductCategoryService } from "./method.service";

@Module({
    // entity~Repository 는 import에 주입
    imports: [ TypeOrmModule.forFeature( [ProductCategory] ) ],
    
    providers :[
        // 이게 서비스에서 온거야~ 하는 의존성 주입ㅠ 무슨 말이야 이게 ㅠㅠ
        ProductCategoryService, 
        ProductCategoryResolver,
    ]
})
export class ProductCategoryModule{

}