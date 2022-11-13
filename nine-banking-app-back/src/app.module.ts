import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './accounts/entities/account.entity';
import { Users } from './users/entities/user.entity';
import { Transactions } from './transactions/entities/transaction.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dsa1150456',
      database: 'nine_bank',
      entities: [Users,Accounts,Transactions],
      synchronize: false,
      autoLoadEntities: true
    }),
    TransactionsModule,
    AccountsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}