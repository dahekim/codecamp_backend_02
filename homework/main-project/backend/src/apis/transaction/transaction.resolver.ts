import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { IamportService } from '../iamport/iamport.service';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';

@Resolver()
export class TransactionResolver {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Transaction)
  async createTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 1. 아임포트에서 Access Token 받아오기
    const accessToken = await this.iamportService.getIamportAccessToken();
    console.log('📛', accessToken);

    // 2-1. 액세스 토큰이 유효한지 확인
    await this.iamportService.isValidUid({ impUid, accessToken });
    // 2-2. 결제 테이블에 이미 있는 아이디인지 확인
    await this.transactionService.isExist({ impUid });
    // 3. 트랜잭션 테이블에 추가
    return this.transactionService.create({ impUid, amount, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Transaction)
  cancelTransaction(
    @Args('impUid') impUid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    console.log('📛📛', impUid);
    return this.transactionService.cancel({ impUid, currentUser });
  }
}
