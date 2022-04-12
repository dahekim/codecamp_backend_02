import { Module } from "@nestjs/common";
import { UserService } from "../users/users.service";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/entities/users.entity";


@Module({
    imports:[ 
        JwtModule.register({}),
        TypeOrmModule.forFeature([Users])
    ],
    providers:[
        AuthResolver,
        AuthService,
        UserService,
    ]
})
export class AuthModule {}