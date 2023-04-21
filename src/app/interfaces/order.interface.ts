import { ProductsQty } from './products.interface';

export interface Order {
  id?: string;
  userId: string | null;
  client: string;
  tableNum: number | null;
  products: ProductsQty[];
  status: string;
  dataEntry: Date;
}
