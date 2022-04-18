import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { PointTransaction, POINT_TRANSACTION_STATUS_ENUM } from "./entities/pointTransaction.entity";


@Injectable()
export class PointTransactionService{
    constructor(
        @InjectRepository(PointTransaction)
        private readonly pointTransactionRepository : Repository<PointTransaction>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly connection : Connection
    ){}
    
    async create( { impUid, amount, currentUser } ){
        // queryRunner와 db 사이 연결
        const queryRunner = await this.connection.createQueryRunner()
        await queryRunner.connect()

        // transaction 시작
        await queryRunner.startTransaction()
        
        try {
        // 1. pointTransaction 테이블의 거래기록 1줄 생성
        const pointTransaction = await this.pointTransactionRepository.create({
            impUid: impUid,
            amount: amount,
            user: currentUser,
            status:POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
        })
        await queryRunner.manager.save(pointTransaction) // await this.pointTransactionRepository.save(pointTransaction)
        // throw new Error("에러발생~")
        // 2. 유저의 포인트 데이터 찾아와서 업데이트 
        const user = await this.userRepository.findOne({ id: currentUser.id })
        // await this.userRepository.update(
        //     {id: user.id}, // 조건
        //     {point: user.point + amount}, // 업데이트할 컬럼 값
        // )
        const updatedUser = await this.userRepository.create({ 
            ...user,
            point : user.point+amount, 
        })
        
        await queryRunner.manager.save(updatedUser) // this.userRepository.save(updatedUser)
        // commit 성공 확정! 
        await queryRunner.commitTransaction()
        // 3. 최종 결과를 프론트엔드에 반환
        return pointTransaction
    }   catch(error){
        // rollback 되돌리기
        // 위의 세 과정 중 하나라도 실패하면 catch로 돌아온다!
        // 에러가 나서 돌아오면 모든 문장 다 돌려줘야 한다!
        await queryRunner.rollbackTransaction()
        } finally {
        // 다 끝났으면 연결 끊어주기!
        await queryRunner.release()
        }
    }
}