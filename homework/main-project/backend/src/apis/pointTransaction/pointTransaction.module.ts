import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/entities/users.entity";
import { PointTransaction } from "./entities/pointTransaction.entity";
import { PointTransactionResolver } from "./pointTransaction.resolver";
import { PointTransactionService } from "./pointTransaction.service";

@Module({
    imports:[ TypeOrmModule.forFeature ( [ PointTransaction, Users ] ) ],
    providers:[ PointTransactionResolver, PointTransactionService, ] ,
})

export class PointTransactionModule{ }