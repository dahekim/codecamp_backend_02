import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findOne({ email_user }) {
    return await this.userRepository.findOne({ 
      where: { email_user : email_user }
    })
}
  async findAll(){
    return await this.userRepository.find()
  }

  async create({ 
    nickname_user, 
    birth_user, 
    email_user, 
    hashedPassword: password, 
    desc_user }) {
    const user = await this.userRepository.findOne({
      where: { email_user : email_user  }
    });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    return await this.userRepository.save({
      nickname_user,
      birth_user,
      email_user,
      password,
      desc_user,
    });
  }
  
    async update( { password, email_user } ) {
      const pw_update = await this.userRepository.findOne({
        where: { email_user: email_user }
      }) 
      const hashedPassword = await bcrypt.hash(password, 10)

      const newPassword = {
        ...pw_update,
        password: hashedPassword,
      }
      return await this.userRepository.save(pw_update)
    }

    async delete(email_user){
      const result = await this.userRepository.softDelete({email_user:email_user})
      return result.affected? true :false
    }
  
}
