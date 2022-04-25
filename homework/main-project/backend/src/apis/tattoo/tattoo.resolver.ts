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
    console.log(`${search}`)
    const isCache = await this.elasticsearchService.search({
      index: "mytattoo",
      query: {
        match_all: {},
      },
    })

    // 캐싱결과가 없을 경우
    if (!isCache.hits.hits){

    }
    // 캐싱결과가 있을 경우 결과를 클라이언트에 반환
    else {
      console.log(JSON.stringify(isCache, null, ' '))
      return this.tattooService.findAll();
    }
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
