import { ProductsQty } from './products.interface';

export interface Order {
  // _id: string;
  userId: string | null;
  client: string;
  tableNum: number;
  products: ProductsQty[];
  status: string;
  dataEntry: Date;
}
