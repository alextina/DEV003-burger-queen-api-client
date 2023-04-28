// Esquema para tipar  cada producto
export interface Products {
  id: string;
  name: string;
  price: number;
  image: string;
  type: string;
  dateEntry: Date;
}

// Esquema para tipar el producto de la orden
export interface ProductsQty {
  qty: number;
  product: Products;
}

