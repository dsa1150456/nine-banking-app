import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
// import { UpdateTransactionDTO } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('byuser/:id')
  findByUserId(@Param('userid') userid: number) {
    return this.transactionsService.findByUserId(userid);
  }

  @Post()
  transactionHandle(@Body() transaction: CreateTransactionDTO) {
    if (transaction.transaction_type == "deposit") {
      return this.transactionsService.deposit(transaction);
    }
    if (transaction.transaction_type == "withdraw") { 
      return this.transactionsService.withdraw(transaction);;
    }
    if (transaction.transaction_type == "transfer_received" || transaction.transaction_type == "transfer_sended" ) {
      return this.transactionsService.transfer(transaction);
    }
  }

  
}
