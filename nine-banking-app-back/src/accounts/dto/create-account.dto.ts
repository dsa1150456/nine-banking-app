import { IsNotEmpty } from 'class-validator';

export class CreateAccountDTO {
    @IsNotEmpty()
    readonly accountid: number;
  
    @IsNotEmpty()
    readonly balance: number;
  
    @IsNotEmpty()
    readonly userid: number;
  }