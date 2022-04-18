import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService{
    constructor(
        // User Repository DB에 접근
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async findOne({email}) {
        return await this.userRepository.findOne({email})
    }

    async create( { email, hashedPassword : password, name, age } ){
        // 이메일 검증, 레파지토리에 이메일 있어?        
        // 있으면 프론트로 에러 떨궈줘! (이미 가입된 메일 있어서 충돌이 났네)
        const user = await this.userRepository.findOne( { email } )
        if(user) throw new ConflictException("이미 등록된 이메일입니다.")

        return await this.userRepository.save( { email, password, name, age } )
        // 키 값과 value 값이 같아서 (password = password) value 값 생략
    }
}