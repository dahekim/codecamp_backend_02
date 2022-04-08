import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BodypartResolver } from "./bodypart.resolver";
import { BodypartService } from "./bodypart.service";
import { Bodypart } from "./entities/bodypart.entity";

@Module({
    // entity~Repository 는 import에 주입
    imports: [ TypeOrmModule.forFeature( [Bodypart] ) ],
    
    providers :[
        // 이게 서비스에서 온거야~ 하는 의존성 주입ㅠ 무슨 말이야 이게 ㅠㅠ
        BodypartService, 
        BodypartResolver,
    ]
})
export class BodypartModule{

}