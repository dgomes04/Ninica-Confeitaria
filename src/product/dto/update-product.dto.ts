import { Decimal } from '@prisma/client/runtime';
import {
  IsBoolean,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDecimal()
  @IsOptional()
  price?: Decimal;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  options?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsNumber()
  @IsOptional()
  categoriaId?: number;
}
