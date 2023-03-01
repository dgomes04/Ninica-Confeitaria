import { Product } from 'src/product/entities/product.entity';

export class Category {
  id: number;
  type: string;
  active: boolean;
  produtos: Product[];
}
