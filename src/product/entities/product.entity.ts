import { Decimal } from '@prisma/client/runtime';

export class Product {
  id: number;
  name: string;
  price: Decimal;
  description: string;
  options?: string;
  categoriaId: number;
}
