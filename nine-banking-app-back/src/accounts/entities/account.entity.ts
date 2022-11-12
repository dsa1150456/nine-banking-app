import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnNumericTransformer } from 'src/utils/ColumnNumericTransformer';

@Entity('accounts')
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn({name:'accountid'})
  accountid: number;

  @Column({name:'balance', type: "decimal", precision: 10, scale: 2, transformer: new ColumnNumericTransformer()})
  balance: number;

  @Column({name:'user_userid'})
  userid: number;
}
