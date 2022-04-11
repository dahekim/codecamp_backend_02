import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Design } from '../design/entities/design.entity';
import { Method } from '../method/entities/method.entity';
import { TattooTag } from '../tag/entities/tattooTag.entity';
import { Tattoo } from './entities/tattoo.entity';
import { TattooResolver } from './tattoo.resolver';
import { TattooService } from './tattoo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tattoo, Design, Method, TattooTag])],

  providers: [TattooService, TattooResolver],
})
export class TattooModule {}
