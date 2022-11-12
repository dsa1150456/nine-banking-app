import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transactions {
  @PrimaryGeneratedColumn({name:'transactionid'})
  transactionid: number;

  @Column({name:'transaction_type'})
  transaction_type: string;

  @Column({name:'transaction_amount', type: "decimal", precision: 10, scale: 2})
  transaction_amount: number;

  @Column({name:'from_account_id'})
  from_account_id: number;

  @Column({name:'to_account_id'})
  to_account_id: number;

  @Column({name:'transaction_time'})
  transaction_time: string;

  @Column({name:'note'})
  note: string;

}