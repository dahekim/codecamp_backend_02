import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Tattoo } from "../tattoo/entities/tattoo.entity";
import { Image } from "./entities/image.entity"
import { ImageResolver } from "./image.resolver";
import { ImageService } from "./image.service";

@Module({
    imports:[ TypeOrmModule.forFeature( [ Image, Tattoo ] ) ],
    providers: [ ImageService, ImageResolver, ]
})

export class ImageModule{}