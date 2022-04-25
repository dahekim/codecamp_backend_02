import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateTattooInput } from './dto/createTattoo.input'
import { UpdateTattooInput } from './dto/updateTattoo.input'

import { Tattoo } from './entities/tattoo.entity'
import { TattooService } from './tattoo.service'

import { ElasticsearchService } from '@nestjs/elasticsearch'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER, Inject } from '@nestjs/common'


@Resolver()
export class TattooResolver {
  constructor(
    private readonly tattooService: TattooService,
    private readonly elasticsearchService: ElasticsearchService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
    ) {}
  
  // 타투 전체 목록 조회
  @Query( ()=> [Tattoo] )
  async fetchTattoos(@Args('search') search: string) {
    // 1. Redis에 해당 검색결과가 있는지 확인
    // 초기값은 undefined, 검색 이력이 없다면(=Redis에 없다면) 바로 3-1.로 넘어간다
    const resultArr = []
    const inRedis = await this.cacheManager.get(`name_tattoo:${search}`)
    const inElastic = await this.elasticsearchService.search({
      index: "mytattoo",
      query: { prefix : { "name_tattoo" : search } },
    })

    // 2. Redis에 해당 검색결과가 있다면 결과를 클라이언트에 반환    
    if(inRedis) {
      console.log("🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑")
      console.log("🛑🛑🛑🛑🛑 Redis에 있던 검색 결과를 반환합니다. 🛑🛑🛑🛑")
      console.log(`Redis 값 : ${inRedis}`)
      console.log("🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑")
      return inRedis
    }

    // 3-1. Redis에 해당 검색결과가 없다면 해당 검색어를 ElasticSearch에서 검색
    else {
      for (let i = 0 ; i < inElastic.hits.total['value']; i++){
        resultArr.push(inElastic.hits.hits[i]['_source'])
      }
      // 3-2. 조회 결과를 Redis에 저장
      // 3-3. 조회결과([Product])를 클라이언트에 반환
      await this.cacheManager.set( `name_tattoo:${search}`, inElastic , { ttl: 0 } )
      console.log("👻👻👻👻👻 ElasticSearch에 있는 결과를 가져왔습니다. 👻👻👻👻👻")
      console.log(JSON.stringify(resultArr, null, ''))
      console.log("👻👻👻👻👻 ElasticSearch에 있는 결과를 가져왔습니다. 👻👻👻👻👻")
      return resultArr      
    }    
    // console.log(JSON.stringify(inElastic, null, ' '))
    // return this.tattooService.findAll();
  }

  // 삭제 데이터 포함한 전체 목록 조회
  @Query(() => [Tattoo])
  fetchTattoosWithDel(@Args('tattooId') tattooId: string) {
    return this.tattooService.withDelete();
  }

  // 타투 하나 정보 조회
  @Query(() => Tattoo)
  async fetchTattoo(@Args('tattooId') tattooId: string) {
    return await this.tattooService.findOne({ tattooId });
  }

  // 타투 데이터 생성
  @Mutation(() => Tattoo)
  createTattoo(
    @Args('createTattooInput') createTattooInput: CreateTattooInput,
  ) {
    return this.tattooService.create({ createTattooInput });
  }

  // 타투 데이터 수정
  @Mutation(() => Tattoo)
  async updateTattoo(
    @Args('tattooId') tattooId: string,
    @Args('updateTattooInput') updateTattooInput: UpdateTattooInput,
  ) {
    await this.tattooService.checkStart({ tattooId });

    return await this.tattooService.update({ tattooId, updateTattooInput });
  }

  // 타투 데이터 삭제 (소프트 딜리트)
  // 삭제 했으면  true, 아니면 false인 boolean 타입으로 출력
  @Mutation(() => Boolean)
  async deleteTattoo(@Args('tattooId') tattooId: string) {
    return await this.tattooService.delete({ tattooId });
  }

  // 삭제 데이터 복구
  @Mutation(() => Boolean)
  async restoreTattoo(@Args('tattooId') tattooId: string) {
    return await this.tattooService.restore({ tattooId });
  }
}
