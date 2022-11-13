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
      where: { accountid: createTransactionDTO.from_account_id }
    });
    accounts.balance += createTransactionDTO.transaction_amount;
    this.accountsRepository.save(accounts);
    this.transactionsRepository.save(createTransactionDTO);
    return accounts;
  }

  async withdraw(createTransactionDTO: CreateTransactionDTO) {
    const accounts = await this.accountsRepository.findOne({
      where: { accountid: createTransactionDTO.from_account_id }
    });
    if (accounts.balance < createTransactionDTO.transaction_amount) {
      throw new BadRequestException('ไม่สามารถถอนเงินได้ ' + 'ยอดเงินคงเหลือ: ' + accounts.balance +
        ' ยอดเงินที่ต้องการถอน:' + createTransactionDTO.transaction_amount)
    }
    accounts.balance -= createTransactionDTO.transaction_amount;
    this.accountsRepository.save(accounts);
    this.transactionsRepository.save(createTransactionDTO);
    return accounts;
  }

  async transfer(createTransactionDTO: CreateTransactionDTO) {
    const mainAccount = await this.accountsRepository.findOne({
      where: { accountid: createTransactionDTO.from_account_id }
    });
    if (await this.accountExists(createTransactionDTO.to_account_id) == false) {
        throw new BadRequestException("ไม่มีบัญชีที่จะโอนให้")
    } 
    const otherAccount = await this.accountsRepository.findOne({
        where: { accountid: createTransactionDTO.to_account_id }
    })
    ;
    if (mainAccount.accountid == otherAccount.accountid) {
       throw new BadRequestException("โอนให้ตัวเองไม่ได้นะครับ")
    }
    if (mainAccount.balance < createTransactionDTO.transaction_amount) {
      throw new BadRequestException('ไม่สามารถโอนเงินได้ ' + 'ยอดเงินคงเหลือ:' + mainAccount.balance +
        ' ยอดเงินที่ต้องการโอน: ' + createTransactionDTO.transaction_amount)
    }

    mainAccount.balance = mainAccount.balance - createTransactionDTO.transaction_amount;
    otherAccount.balance = otherAccount.balance + createTransactionDTO.transaction_amount;
    this.accountsRepository.save(mainAccount);
    this.accountsRepository.save(otherAccount);
    this.transactionsRepository.save(createTransactionDTO);
    return mainAccount;
  }

  findAll(): Promise<Transactions[]> {
    return this.transactionsRepository.find();
  }

  async findByAccountId(id: number): Promise<Transactions[]> {
    return await this.transactionsRepository.find({ 
      where: [{to_account_id:id},{from_account_id:id}],
    })
  };

  async accountExists(accountid: number): Promise<Boolean> {
    const accounts = await this.accountsRepository.findOneBy({ accountid });
    if (accounts) {
      return true
    } else {
      return false;
    }
  }
}