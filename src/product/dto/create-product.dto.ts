import { Decimal } from '@prisma/client/runtime';
import { IsBoolean, IsDecimal, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsDecimal()
  price: Decimal;

  @IsString()
  description: string;

  @IsBoolean()
  options: boolean;
}
