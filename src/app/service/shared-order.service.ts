import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedOrderService {
  order: Products[] = [];

  private orderSubject = new BehaviorSubject<Products[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  get order$(): Observable<Products[]> {
    return this.orderSubject.asObservable();
  }

  get total$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  private addToOrder(product: Products): void {
    const isProductInOrder: Products | undefined = this.order.find(
      (el) => el._id === product._id
    );
    if (isProductInOrder) {
      isProductInOrder.qty += 1;
    } else {
      this.order.push({ ...product, qty: 1 });
    }
    this.orderSubject.next(this.order);
  }

  private totalCount(): void {
    const total: number = this.order.reduce(
      (total, el) => (total += el.price * el.qty),
      0
    );
    return this.totalSubject.next(total);
  }
  onClickAddOrder(product: Products): void {
    this.addToOrder(product);
    this.totalCount();
  }
}
