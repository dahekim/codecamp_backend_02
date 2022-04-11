import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BodypartResolver } from "./bodypart.resolver";
import { BodypartService } from "./bodypart.service";
import { Bodypart } from "./entities/bodypart.entity";

@Module({
    imports: [ TypeOrmModule.forFeature( [Bodypart] ) ],
    
    providers :[
        BodypartService, 
        BodypartResolver,
    ]
})
export class BodypartModule{

}