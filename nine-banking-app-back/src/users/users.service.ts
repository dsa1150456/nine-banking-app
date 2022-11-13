import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    if (await this.usernameExists(createUserDto.username)) {
      throw new BadRequestException("ชื่อนี้มีคนใช้แล้ว")
    } else {
      //encrypted password
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      createUserDto.password = hash
      return this.userRepository.save(createUserDto);
    }
  }

  async findAll() : Promise<Users[]> {
    return this.userRepository.find();
  }

  async login(loginUserDto: LoginUserDTO) {
    if (await this.usernameExists(loginUserDto.username)) {
      const user = await this.userRepository.findOneBy({ username: loginUserDto.username });
      const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
      if (isMatch) {
        return {
          userid: user.userid,
          username: user.username
        }
      } else throw new BadRequestException("รหัสผ่านไม่ถูกต้อง")
    } else {
      throw new BadRequestException("ชื่อผู้ใช้ไม่ถูกต้อง")
    }
  }

  async findOne(userid: number) : Promise<Users> {
    return await this.userRepository.findOneBy({ userid });
  }

  async usernameExists(username: string): Promise<Boolean> {
    const user = await this.userRepository.findOneBy({ username: username });
    if (user) {
      return true
    } else {
      return false;
    }
  }
}
