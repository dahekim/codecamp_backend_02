import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GenreService  } from "./genre.service";
import { TattooGenre } from "./entities/tattooGenre.entity";

@Resolver()
export class GenreResolver{

    constructor(private readonly genreService: GenreService,){

    }
    @Mutation(()=> TattooGenre ) 
    createLocation( 
        @Args("name_genre") name_genre: string,
        ){
        return this.genreService.create( { name_genre } )
        
    }
}