import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { IamportService } from '../iamport/iamport.service';
import { Transaction, TRANSACTION_STATUS_ENUM } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';

@Resolver()
export class TransactionResolver {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly iamportService: IamportService,
  ) {}

  // 결제 등록
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Transaction)
  async createTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 1. 아임포트에서 Access Token 받아오기
    // 2-1. 결제 완료 기록이 존재하는지 확인
    // 2-2. transaction 테이블에 impUid가 한번만 존재하는지 확인 (중복결제 체크)
    // 3. 트랜잭션 테이블에 추가
    const accessToken = await this.iamportService.getIamportAccessToken();
    console.log('📛', accessToken);  
    await this.iamportService.isExist({ impUid, accessToken, amount });
    await this.transactionService.isDuplicate({ impUid })
    return this.transactionService.create({ impUid, amount, currentUser, status:TRANSACTION_STATUS_ENUM.PAYMENT});
  }

  // 결제 취소 
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Transaction)
  async cancelTransaction(
    @Args('impUid') impUid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 1. 이미 취소된 건인지 확인
    // 2. 취소하기에 충분한 포인트 잔액이 남아있는지 확인
    // 3. 실제로 아임포트에 취소 요청하기
    // 4. transaction 테이블에서 결제 취소 등록하기 
    // (수정X, 똑같은 데이터를 하나 더 추가하는데 status를 cancel로 입력)

    await this.transactionService.isCanceled({ impUid })
    await this.transactionService.isExistCanceledPoint({impUid, currentUser})

    const accessToken = await this.iamportService.getIamportAccessToken()
    const cancelAmount = await this.iamportService.cancel({impUid, accessToken})

    this.transactionService.cancel({
      impUid, 
      amount: cancelAmount, 
      currentUser,
    })
  }
}
