import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDTO) {
    return this.userRepository.save(createUserDto);
  }

  async findAll() : Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(userid: number) : Promise<Users> {
    return this.userRepository.findOneBy({ userid });
  }
}
