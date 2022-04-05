import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tattoo } from "./entities/tattoo.entity";
import { TattooResolver } from "./tattoo.resolver";
import { TattooService } from "./tattoo.service";

@Module({
    imports: [ TypeOrmModule.forFeature( [ Tattoo ] )],

    providers: [
        TattooService,
        TattooResolver,
    ]
})

export class TattooModule{

}