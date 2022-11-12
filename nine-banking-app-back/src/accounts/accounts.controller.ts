import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Accounts } from './entities/account.entity';
import { CreateAccountDTO } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDTO: CreateAccountDTO) {
    return this.accountsService.create(createAccountDTO);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.accountsService.findOne(+id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.accountsService.remove(+id);
  }

}