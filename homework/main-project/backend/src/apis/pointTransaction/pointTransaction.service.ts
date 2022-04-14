import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CurrentUser } from "src/commons/auth/gql-user.param";
import { Repository } from "typeorm";
import { Users } from "../users/entities/users.entity";
import { PointTransaction, POINT_TRANSACTION_STATUS_ENUM } from "./entities/pointTransaction.entity";


@Injectable()
export class PointTransactionService{
    constructor(
        @InjectRepository(PointTransaction)
        private readonly pointTransactionRepository : Repository<PointTransaction>,
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ){}
    
    async create( { impUid, amount, currentUser } ){
        // 1. pointTransaction 테이블의 거래기록 1줄을 생성, 
        // (실제로 포인트가 올리가지 않은 상태)
        const pointTransaction = await this.pointTransactionRepository.save({
            impUid: impUid,
            amount: amount,
            user: currentUser,
            status:POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
        })

        // 2. 유저의 포인트 데이터 찾아와서 업데이트하기 
        const user = await this.userRepository.findOne({
            where: { id_user: currentUser.id_user }
        })
        await this.userRepository.update(
            {id_user: user.id_user}, // 조건
            {point: user.point + amount} // 업데이트할 컬럼 값
        )

        // 3. 최종 결과를 프론트엔드에 돌려주기 
        return pointTransaction

    }
}