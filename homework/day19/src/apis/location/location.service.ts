import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TattooLocation } from "./entities/location.entity";

@Injectable()
export class LocationService{
    
    constructor(
        @InjectRepository(TattooLocation)
        private readonly locationRepository: Repository<TattooLocation>,
    ){  }


    async create( { name_location } ){

        const result = await this.locationRepository.save({ name_location })

        console.log(result)
        return result
    }
}