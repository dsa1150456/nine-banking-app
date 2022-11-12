import { IsNotEmpty } from 'class-validator';
export class CreateTransactionDTO {
    @IsNotEmpty()
    readonly transactionid: number;
  
    @IsNotEmpty()
    readonly transaction_type: string;
  
    @IsNotEmpty()
    readonly transaction_amount: number;

    @IsNotEmpty()
    readonly to_account_id: number;

    @IsNotEmpty()
    readonly from_account_id: number;

    @IsNotEmpty()
    readonly transaction_time: string;

    @IsNotEmpty()
    readonly note: string;
}