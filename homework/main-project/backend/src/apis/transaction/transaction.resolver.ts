import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { CurrentUser, ICurrentUser } from "src/commons/auth/gql-user.param";
import { Transaction } from "./entities/transaction.entity";
import { TransactionService } from "./transaction.service";

@Resolver()
export class TransactionResolver{
    constructor(
        private readonly transactionService: TransactionService
    ){}

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(()=> Transaction)
    createPointTransaction(
        @Args('impUid') impUid: string,
        @Args('amount') amount: number,
        @CurrentUser() currentUser : ICurrentUser,
    ){
        console.log('📛',impUid)
        
        return this.transactionService.create({ impUid, amount, currentUser })
    }
}