import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Design } from "./entities/design.entity";
import { DesignResolver } from "./design.resolver";
import { DesignService } from "./design.service";

@Module({
    // entity~Repository 는 import에 주입
    imports: [ TypeOrmModule.forFeature( [ Design ] ) ],
    
    providers :[
        // 이게 서비스에서 온거야~ 하는 의존성 주입ㅠ 무슨 말이야 이게 ㅠㅠ
        DesignService, 
        DesignResolver,
    ]
})
export class DesignModule{

}