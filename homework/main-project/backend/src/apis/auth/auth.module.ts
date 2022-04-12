import { Module } from "@nestjs/common";
import { UserService } from "../users/users.service";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/entities/users.entity";
import { JwtRefreshStrategy } from "src/commons/auth/jwt-refresh.strategy";
import { JwtGoogleStrategy } from "src/commons/auth/jwt-social-google.strategy";
import { AuthController } from "./auth.controller";


@Module({
    imports:[ 
        JwtModule.register({}),
        TypeOrmModule.forFeature([Users])
    ],
    providers:[
        JwtGoogleStrategy,
        JwtRefreshStrategy,
        AuthResolver,
        AuthService,
        UserService,
    ],
    controllers:[
        AuthController,
    ],
})
export class AuthModule {}