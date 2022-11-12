import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { Accounts } from 'src/accounts/entities/account.entity';


@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
  ) { }
  
  async deposit(createTransactionDTO: CreateTransactionDTO) {
    const accounts = await this.accountsRepository.findOne({
      where: { accountid: createTransactionDTO.to_account_id }
    });
    accounts.balance += createTransactionDTO.transaction_amount;
    this.accountsRepository.save(accounts);
    this.transactionsRepository.save(createTransactionDTO);
    return accounts;
  }

  async withdraw(createTransactionDTO: CreateTransactionDTO) {
    const accounts = await this.accountsRepository.findOne({
      where: { accountid: createTransactionDTO.to_account_id }
    });
    if (accounts.balance < createTransactionDTO.transaction_amount) {
      throw new BadRequestException('cannot withdraw, not enough balance ' + 'remaining balance: ' + accounts.balance +
        ' withdraw amount: ' + createTransactionDTO.transaction_amount)
    }
    accounts.balance -= createTransactionDTO.transaction_amount;
    this.accountsRepository.save(accounts);
    this.transactionsRepository.save(createTransactionDTO);
    return accounts;
  }

  async transfer(createTransactionDTO: CreateTransactionDTO) {
    const mainAccount = await this.accountsRepository.findOne({
      where: { accountid: createTransactionDTO.to_account_id }
    });
    const otherAccount = await this.accountsRepository.findOne({
      where: { accountid: createTransactionDTO.from_account_id }
    });
    if (mainAccount.accountid == otherAccount.accountid) {
       throw new BadRequestException("โอนให้ตัวเองไม่ได้นะครับ")
    }
    if (createTransactionDTO.transaction_type == "transfer_received") {
      if (otherAccount.balance < createTransactionDTO.transaction_amount) {
        throw new BadRequestException('cannot withdraw, not enough balance ' + 'other Account balance: ' + otherAccount.balance +
          ' withdraw amount: ' + createTransactionDTO.transaction_amount)
      }
      mainAccount.balance = mainAccount.balance + createTransactionDTO.transaction_amount;
      otherAccount.balance = otherAccount.balance - createTransactionDTO.transaction_amount;
    }
    if (createTransactionDTO.transaction_type == "transfer_sended") {
      if (mainAccount.balance < createTransactionDTO.transaction_amount) {
        throw new BadRequestException('cannot withdraw, not enough balance ' + 'main Account balance: ' + mainAccount.balance +
          ' withdraw amount: ' + createTransactionDTO.transaction_amount)
      }
      mainAccount.balance = mainAccount.balance - createTransactionDTO.transaction_amount;
      otherAccount.balance = otherAccount.balance + createTransactionDTO.transaction_amount;
    }

    this.accountsRepository.save(mainAccount);
    this.accountsRepository.save(otherAccount);
    this.transactionsRepository.save(createTransactionDTO);
    return mainAccount;
  }

  findAll(): Promise<Transactions[]> {
    return this.transactionsRepository.find();
  }

  async findByUserId(id: number): Promise<Transactions[]> {
    return await this.transactionsRepository.find({ 
      where: [{to_account_id:id},{from_account_id:id}],
    })
  };
}