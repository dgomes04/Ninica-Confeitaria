import { Decimal } from '@prisma/client/runtime';

export class Produtos {
  id: number;
  name: string;
  price: Decimal;
  description: string;
  options?: string;
}
