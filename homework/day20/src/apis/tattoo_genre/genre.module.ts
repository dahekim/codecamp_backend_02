import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TattooGenre } from "./entities/tattooGenre.entity";
import { GenreResolver} from "./genre.resolver";
import { GenreService } from "./genre.service";

@Module({
    imports: [ TypeOrmModule.forFeature( [ TattooGenre ] ) ],
    providers :[

        GenreService, 
        GenreResolver,
    ]
})
export class GenreModule{

}