import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateCartDto } from './create-cart.dto';

export class RemoveCartDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  cartId?: string;

  @IsNumber()
  @IsOptional()
  productId?: number;
}
