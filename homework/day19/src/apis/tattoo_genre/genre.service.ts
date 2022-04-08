import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TattooGenre } from "./entities/tattooGenre.entity";

@Injectable()
export class GenreService{
    
    constructor(
        @InjectRepository(TattooGenre)
        private readonly GenreRepository: Repository<TattooGenre>,
    ){  }


    async create( { name_genre } ){

        const result = await this.GenreRepository.save({ name_genre })

        console.log(result)
        return result
    }
}