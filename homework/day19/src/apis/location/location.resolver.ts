import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { LocationService } from "./location.service";
import { TattooLocation } from "./entities/location.entity";

@Resolver()
export class LocationResolver{

    constructor(private readonly locationService: LocationService,){

    }
    @Mutation(()=> TattooLocation ) 
    createLocation( 
        @Args("name") name_location: string,
        ){

        return this.locationService.create( { name_location } )
        
    }
}