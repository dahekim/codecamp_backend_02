import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create({ nickname_user, birth_user, email_user, password, desc_user }) {
    const user = await this.userRepository.findOne({
      where: { email_user : email_user  }} );
    if (user) throw new ConflictException('이미 등록된 이메일입니다. ');

    return await this.userRepository.save({
      nickname_user,
      birth_user,
      email_user,
      password,
      desc_user,
    });
  }
}
