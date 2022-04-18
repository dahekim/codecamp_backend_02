import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';

import { Repository } from 'typeorm';
import {
  Transaction,
  TRANSACTION_STATUS_ENUM,
} from './entities/transaction.entity';


@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

    // 중복확인
    async isDuplicate({impUid}){
      const result = await this.transactionRepository.findOne({
        where: { impUid:impUid }
      })
      if( result ) throw new ConflictException("이미 결제된 아이디입니다.")
    }

    // 취소건수 확인
    async isCanceled({ impUid }){
      const result1 = await this.transactionRepository.findOne({
        where: { impUid:impUid },
      })
      const result2 = await this.transactionRepository.findOne({
        where: { status: TRANSACTION_STATUS_ENUM.CANCEL },
      })

      if( result1&&result2 ) throw new ConflictException("이미 취소된 결제 아이디입니다.")
    }

    // 취소포인트 확인
    async isExistCanceledPoint({impUid, currentUser}){
      const result1 = await this.transactionRepository.findOne({
        where: { impUid:impUid },
      })
      const result2 = await this.transactionRepository.findOne({
        where: { status: TRANSACTION_STATUS_ENUM.PAYMENT },
      })
      const result3 =  await this.transactionRepository.findOne({
        where: { user: currentUser.id_user },
      })
      // 다른 사람이 입금한 내용으로 취소하려는 경우
      if(!result1) throw new UnprocessableEntityException("결제 기록이 존재하지 않습니다.")
      
      const user = await this.userRepository.findOne({ where: {id_user: currentUser.id_user} })
      if(user.point>= result1.amount) throw new UnprocessableEntityException("포인트가 부족합니다.")
    }

    async cancel({impUid, amount, currentUser}){
      const transaction = await this.create({
        impUid, 
        amount: -amount, 
        currentUser,
        status: TRANSACTION_STATUS_ENUM.CANCEL,
      })
      return transaction
    }



    async create({ impUid,amount, currentUser, status, }) {
      // 1. transaction 테이블의 거래기록 1줄을 생성,
      // (db에 거래기록만 반영되고 실제로 포인트가 올리가지는 않은 상태)
      const transaction = await this.transactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser.id_user,
        status: TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await this.transactionRepository.save(transaction)

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

  
}