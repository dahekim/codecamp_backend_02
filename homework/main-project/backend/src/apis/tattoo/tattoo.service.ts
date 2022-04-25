import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Design } from '../design/entities/design.entity';
import { Method } from '../method/entities/method.entity';
import { TattooTag } from '../tag/entities/tattooTag.entity';
import { Tattoo } from './entities/tattoo.entity';

@Injectable()
export class TattooService {
  constructor(
    @InjectRepository(Tattoo)
    private readonly tattooRepository: Repository<Tattoo>,

    @InjectRepository(Method)
    private readonly methodRepository: Repository<Method>,

    @InjectRepository(Design)
    private readonly designRepository: Repository<Design>,

    @InjectRepository(TattooTag)
    private readonly tagRepository: Repository<TattooTag>,
  ) {}

  async findAll() {
    return await this.tattooRepository.find({
      withDeleted:true, 
      relations: [
        'method',
        'design',
        'id_user', 
        'id_part',
        'id_location',
        'id_type',
        'id_genre',
        'tattooTags',
      ],
    });
  }
  
  async findOne({ tattooId }) {
    return await this.tattooRepository.findOne({
      where: { tattooId: tattooId },
      relations: [
        'method',
        'design',
        'id_user', 
        'id_part',
        'id_location',
        'id_type',
        'id_genre',
        'tattooTags',
      ],
    });
  }
  // 삭제한 데이터 포함 모든 데이터 조회
  async withDelete() {
    return await this.tattooRepository.find({
      withDeleted: true,
    });
  }

  async create({ createTattooInput }) {
    const {
      design,
      method,
      id_user, 
      id_part,
      id_location,
      id_type,
      id_genre,
      tattooTags,
      ...tattoo
    } = createTattooInput;
    const designResult = await this.designRepository.save({
      ...design,
    });
    const methodResult = await this.methodRepository.save({
      ...method,
    });

    const result2 = [];
    for (let i = 0; i < tattooTags.length; i++) {
      const tagname = tattooTags[i].replace('#', '');
      const prevTag = await this.tagRepository.findOne({ where : { name_tag: tagname }});
      if (prevTag) {
        result2.push(prevTag);
      } else {
        const newTag = await this.tagRepository.save({ name_tag: tagname });
        result2.push(newTag);
      }
    }
    // console.log(createTattooInput)

    const result = await this.tattooRepository.save({
      ...tattoo,
      design: designResult,
      method: methodResult,
      id_location: { name_location: id_location },
      id_part: { id_part: id_part },
      id_genre: { id_genre: id_genre },
      id_type: { id_type: id_type },
      id_user: { id_user: id_user },
      tattooTags: result2,
    });
    console.log(result);
    return result;
  }

  async update({ tattooId, updateTattooInput }) {
    const tattoo = await this.tattooRepository.findOne({
      where: { tattooId: tattooId },
    });

    const updateTattoo = {
      ...tattoo,
      ...updateTattooInput,
    };
    return await this.tattooRepository.save(updateTattoo);
  }

  // 작업 착수 여부 체크 함수
  async checkStart({ tattooId }) {
    const tattoo = await this.tattooRepository.findOne({
      where: { tattooId: tattooId },
    });

    if (tattoo.isStart)
      throw new UnprocessableEntityException(
        '타투 작업이 착수되어 수정이 불가능합니다!',
      );
  }
  // 타투 삭제
  async delete({ tattooId }) {
    const result = await this.tattooRepository.softDelete({
      tattooId: tattooId,
    });
    return result.affected ? true : false;
  }

  // 삭제 데이터 복구
  async restore({ tattooId }) {
    const result = await this.tattooRepository.restore({ tattooId: tattooId });
    return result.affected ? true : false;
  }
}
