import { Injectable, EventEmitter } from '@angular/core';
import { Products, ProductsQty } from '../interfaces/products.interface';
// rxjs: Reactive Extensions Library for JavaScript
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedOrderService {
  // Se declara y define la variable orden como un array vacío
  order: ProductsQty[] = [];

  private orderSubject = new BehaviorSubject<ProductsQty[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  get order$(): Observable<ProductsQty[]> {
    return this.orderSubject.asObservable();
  }

  get total$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  private addToOrder(product: Products): void {
    const isProductInOrder: ProductsQty | undefined = this.order.find(
      (el) => el.product._id === product._id
    );
    if (isProductInOrder) {
      isProductInOrder.qty += 1;
    } else {
      this.order.push({ product: product, qty: 1 });
    }
    this.orderSubject.next(this.order);
  }

  private totalCount(): void {
    const total: number = this.order.reduce(
      (total, el) => (total += el.product.price * el.qty),
      0
    );
    return this.totalSubject.next(total);
  }

  onClickAddOrder(product: Products): void {
    this.addToOrder(product);
    this.totalCount();
  }

  deleteProduct(id: string): void {
    this.order = this.order.filter((el) => {
      return el.product._id !== id
    });
    this.orderSubject.next(this.order);
  }

  findProductById(id: string): ProductsQty | undefined {
    return this.order.find((el) => {
      return el.product._id === id
    })
  }

  qtyOperations(operations: string, id: string) {
    const product = this.order.find((el) => {
      return el.product._id === id
    })
    if (product) {
      if (operations === 'minus' && product.qty > 0) {
        product.qty = product.qty - 1;
        this.orderSubject.next(this.order);
      }
      if (operations === 'add') {
        product.qty = product.qty + 1;
        this.orderSubject.next(this.order);
      }
      if (product.qty === 0) {
        // this.orderSvc.deleteProduct(id);
        this.deleteProduct(id);
      }
    }
  }

  // comunicar componentes en angular (inputs y outputs)
  $modal = new EventEmitter<any>();
}
