import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Accounts } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDTO } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
  ) {}

  create(createAccountDTO: CreateAccountDTO) {
    return this.accountsRepository.save(createAccountDTO);
  }

  findAll(): Promise<Accounts[]> {
    return this.accountsRepository.find();
  }

  remove(id: number) {
    this.accountsRepository.delete(id);
    return "Account ID #" + id + " successfully deleted";
  }

  async findOne(accountid: number) : Promise<Accounts> {
    return await this.accountsRepository.findOneBy({accountid});
  }

  async findByUserId(userid: number): Promise<Accounts[]> {
    return await this.accountsRepository.find({ 
      where: {userid},
    })
  };
}
