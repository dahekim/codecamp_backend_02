import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';

import {
  Transaction,
  TRANSACTION_STATUS_ENUM,
} from './entities/transaction.entity';

// import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async isExist({ impUid }) {
    const isExist = this.transactionRepository.findOne({
      where: { impUid: impUid },
    });
    const isExist2 = this.transactionRepository.findOne({
      where: { status: TRANSACTION_STATUS_ENUM.PAYMENT },
    });
    if (isExist && isExist2) {
      throw new ConflictException('결제가 완료된 데이터입니다.');
    }
    return true;
  }

  async create({ impUid, amount, currentUser }) {
    // 1. transaction 테이블의 거래기록 1줄을 생성,
    // (db에 거래기록만 반영되고 실제로 포인트가 올리가지는 않은 상태)
    const transaction = await this.transactionRepository.save({
      impUid: impUid,
      amount: amount,
      user: currentUser.id_user,
      status: TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    // 2. 유저의 포인트 데이터 찾아와서 업데이트하기
    const user = await this.userRepository.findOne({
      where: { id_user: currentUser.id_user },
    });
    await this.userRepository.update(
      { id_user: user.id_user }, // 조건
      { point: user.point + amount }, // 업데이트할 컬럼 값
    );

    // 3. 최종 결과를 프론트엔드에 돌려주기
    return transaction;
  }

  async cancel({ impUid, currentUser }) {}
}
