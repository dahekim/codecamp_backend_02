import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TattooLocation } from './entities/location.entity';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';

@Module({
  imports: [TypeOrmModule.forFeature([TattooLocation])],

  providers: [LocationService, LocationResolver],
})
export class LocationModule {}
