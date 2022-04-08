import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TattooLocation } from "./entities/location.entity";
import { LocationResolver } from "./location.resolver";
import { LocationService } from "./location.service";

@Module({
    // entity~Repository 는 import에 주입
    imports: [ TypeOrmModule.forFeature( [TattooLocation] ) ],
    
    providers :[
        // 이게 서비스에서 온거야~ 하는 의존성 주입ㅠ 무슨 말이야 이게 ㅠㅠ
        LocationService, 
        LocationResolver,
    ]
})
export class LocationModule{

}