import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn({name:'accountid'})
  accountid: number;

  @Column({name:'balance'})
  balance: number;

  @Column({name:'user_userid'})
  userid: number;
}
