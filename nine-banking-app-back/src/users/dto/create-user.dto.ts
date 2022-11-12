import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty()
    readonly userid: number;

    @IsNotEmpty()
    readonly username: string;
  
    @IsNotEmpty()
    readonly password: string;
  }