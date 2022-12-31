import { IsEmail, Max, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Min(100000000, { message: 'taxNumber must be at least 9 digit long' })
  @Max(9999999999, { message: 'taxNumber must be at most 10 digit long' })
  taxNumber: string;

  @MinLength(3)
  companyName: string;

  @MinLength(10)
  companyAddress: string;
}
