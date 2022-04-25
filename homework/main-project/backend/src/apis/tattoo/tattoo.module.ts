import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Design } from '../design/entities/design.entity'
import { Method } from '../method/entities/method.entity'
import { TattooTag } from '../tag/entities/tattooTag.entity'
import { Tattoo } from './entities/tattoo.entity'
import { TattooResolver } from './tattoo.resolver'
import { TattooService } from './tattoo.service'
import { ElasticsearchModule } from '@nestjs/elasticsearch'

@Module({
  imports: [ TypeOrmModule.forFeature( [ Tattoo, Design, Method, TattooTag ] ),
  ElasticsearchModule.register({
    node: "http://elasticsearch:9200"
})
],

  providers: [ TattooService, TattooResolver ],
})
export class TattooModule {}
