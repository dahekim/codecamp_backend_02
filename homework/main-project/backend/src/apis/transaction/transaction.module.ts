import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Users } from '../users/entities/users.entity';
import { Transaction } from './entities/transaction.entity';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Users])],
  providers: [TransactionResolver, TransactionService, IamportService],
})
export class TransactionModule {}
