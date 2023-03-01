import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCartDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  cartId: string;
}
