import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsUUID()
  userId: string;
  @IsString()
  @IsOptional()
  payment_type?: string;

  @IsNumber()
  productId: number;
}
