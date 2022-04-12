import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy'
import { Users } from 'src/apis/users/entities/users.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],

  providers: [UserService, UserResolver, JwtAccessStrategy ],
})
export class UserModule {}
