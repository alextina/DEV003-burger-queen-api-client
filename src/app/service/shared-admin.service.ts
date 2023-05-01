import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/users.interface';
import { Products } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class SharedAdminService {
  // $updateUser = new EventEmitter<boolean>();
  constructor() {}
  private userSubject = new BehaviorSubject<User>({
    name: '',
    email: '',
    password: '',
    role: 'role',
  });
  private productSubject = new BehaviorSubject<Products>({
    id: '',
    name: '',
    price: 0,
    image: '',
    type: 'type',
  });
  private updateUserSubject = new BehaviorSubject<boolean>(false);

  private updateProductSubject = new BehaviorSubject<boolean>(false);

  get user$(): Observable<User> {
    return this.userSubject.asObservable();
  }

  get updateUser$(): Observable<boolean> {
    return this.updateUserSubject.asObservable();
  }

  get product$(): Observable<Products> {
    return this.productSubject.asObservable();
  }

  get updateProduct$(): Observable<boolean> {
    return this.updateProductSubject.asObservable();
  }

  addUser(user: User): void {
    this.userSubject.next(user);
  }

  updateUser(value: boolean): void {
    this.updateUserSubject.next(value);
  }

  addToProduct(product: Products): void {
    this.productSubject.next(product);
  }

  updateProduct(value: boolean): void {
    this.updateProductSubject.next(value);
  }

  resetUser(): void {
    this.userSubject.next({
      name: '',
      email: '',
      password: '',
      role: 'role',
    });
  }

  resetProduct(): void {
    this.productSubject.next({
      id: '',
      name: '',
      price: 0,
      image: '',
      type: 'type',
    });
  }
}
