import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TattooType } from "./entities/tattooType.entity";
import { TypeResolver } from "./type.resolver";
import { TypeService } from "./type.service";

@Module({
    // entity~Repository 는 import에 주입
    imports: [ TypeOrmModule.forFeature( [TattooType] ) ],
    
    providers :[
        // 이게 서비스에서 온거야~ 하는 의존성 주입ㅠ 무슨 말이야 이게 ㅠㅠ
        TypeService,
        TypeResolver,
    ]
})
export class TypeModule{

}