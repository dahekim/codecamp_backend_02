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
        await queryRunner.startTransaction("SERIALIZABLE")
        
        try {
        // 1. pointTransaction 테이블의 거래기록 1줄 생성
        const pointTransaction = await this.pointTransactionRepository.create({
            impUid: impUid,
            amount: amount,
            user: currentUser,
            status:POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
        })
        await queryRunner.manager.save(pointTransaction) 
        // 2. 유저의 포인트 데이터 찾아와서 업데이트 
        // const user = await this.userRepository.findOne({ id: currentUser.id })
        const user = await queryRunner.manager.findOne(
            User,
            { id : currentUser.id },        // User 테이블에서 id가 currentUser의 id와 일치하는 것을 찾기
            { lock: { mode : "pessimistic_write" } },
            )
        const updatedUser = await this.userRepository.create({ 
            ...user,
            point : user.point+amount, 
        })
        
        await queryRunner.manager.save(updatedUser)
        // commit 성공 확정! 
        await queryRunner.commitTransaction()
        // 3. 최종 결과를 프론트엔드에 반환
        return pointTransaction
    }   catch(error){
        // rollback 되돌리기
        await queryRunner.rollbackTransaction()
        } finally {
        await queryRunner.release()
        }
    }
}