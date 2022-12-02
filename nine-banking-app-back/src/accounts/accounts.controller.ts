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

  @Get(':accountid')
  findOne(@Param('accountid') accountid: number) {
    return this.accountsService.findOne(accountid);
  }
  
  @Get('byuser/:userid')
  findByUserId(@Param('userid') userid: number) {
    return this.accountsService.findByUserId(userid);
  }
  
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.accountsService.remove(+id);
  }

}