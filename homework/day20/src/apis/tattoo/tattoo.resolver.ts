import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateTattooInput } from './dto/createTattoo.input';
import { UpdateTattooInput } from './dto/updateTattoo.input';

import { Tattoo } from './entities/tattoo.entity';
import { TattooService } from './tattoo.service';

@Resolver()
export class TattooResolver {
  constructor(private readonly tattooService: TattooService) {}
  // 타투 전체 목록 조회
  @Query(() => [Tattoo])
  fetchTattoos() {
    return this.tattooService.findAll();
  }

  // 삭제 데이터 포함한 전체 목록 조회
  @Query(() => [Tattoo])
  fetchTattoosWithDel(@Args('tattooId') tattooId: string) {
    return this.tattooService.withDelete();
  }

  // 타투 하나 정보 조회
  @Query(() => Tattoo)
  fetchTattoo(@Args('tattooId') tattooId: string) {
    return this.tattooService.findOne({ tattooId });
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
  deleteTattoo(@Args('tattooId') tattooId: string) {
    return this.tattooService.delete({ tattooId });
  }

  // 삭제 데이터 복구
  @Mutation(() => Boolean)
  restoreTattoo(@Args('tattooId') tattooId: string) {
    return this.tattooService.restore({ tattooId });
  }
}
