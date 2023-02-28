import { Decimal } from '@prisma/client/runtime';
import { IsBoolean, IsDecimal, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsDecimal()
  price: Decimal;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  options?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
