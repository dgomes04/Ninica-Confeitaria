import { ProductsOnCart } from './productsOnCart.entity';

export class Cart {
  id: string;
  userId: string;
  products: ProductsOnCart[];
  finished: boolean;
}
