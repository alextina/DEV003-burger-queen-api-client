import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ProductsService } from '../service/products.service';
import { SharedOrderService } from '../service/shared-order.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { EventEmitter } from '@angular/core';
import { Products } from '../interfaces/products.interface';
import { Observable, of, throwError } from 'rxjs';

class ProductsTestingService {
  getProducts(): Observable<Products[]> {
    return of([
      {
        _id: '1',
        name: 'American Coffe',
        price: 5,
        image: new URL(
          'https://raw.githubusercontent.com/MariCornelio/burger-queen-server-mock/main/resources/images/american-coffee.png'
        ),
        type: 'breakfast',
        dateEntry: new Date(2023, 3, 4),
      },
      {
        _id: '2',
        name: 'Coffee with Milk',
        price: 7,
        image: new URL(
          'https://raw.githubusercontent.com/MariCornelio/burger-queen-server-mock/main/resources/images/coffee-and-milk.png'
        ),
        type: 'breakfast',
        dateEntry: new Date(2023, 3, 4),
      },
      {
        _id: '5',
        name: 'Plain Burger',
        price: 10,
        image: new URL(
          'https://raw.githubusercontent.com/MariCornelio/burger-queen-server-mock/main/resources/images/plain-burger.png'
        ),
        type: 'lunch',
        dateEntry: new Date(2023, 3, 4),
      },
    ]);
  }
}
class SharedOrderTestingService {
  $modal = new EventEmitter<any>();
  onClickAddProduct(product: Products): void {
    of([]);
  }
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let orderSvc: SharedOrderService;
  let service: ProductsService;
  let toastr: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), SharedModule, FormsModule],
      declarations: [MenuComponent],
      providers: [
        ToastrService,
        { provide: ProductsService, useClass: ProductsTestingService },
        { provide: SharedOrderService, useClass: SharedOrderTestingService },
      ],
    }).compileComponents();
    // creando componente
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // inyectando dependencias ya que son privadas:
    orderSvc = TestBed.inject(SharedOrderService);
    service = TestBed.inject(ProductsService);
    toastr = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it('Should throw an error if getproducts fails', () => {
    spyOn(service, 'getProducts').and.callFake(() => throwError(() => 'Error'));
    spyOn(toastr, 'error').and.callThrough();
    component.ngOnInit();
    expect(toastr.error).toHaveBeenCalledWith('Loading error products');
  });

  it('The modalSwitch property must be changed by event issuance', () => {
    orderSvc.$modal.emit(true);
    expect(component.modalSwitch).toBeTruthy();
  });

  it('active1 and active2 should change according to the type: lunch and breakfast.', () => {
    component.changeProductType('breakfast');
    expect(component.active1).toBeTruthy();
    expect(component.active2).toBeFalsy();
    component.changeProductType('lunch');
    expect(component.active2).toBeTruthy();
    expect(component.active1).toBeFalsy();
  });

  it('onClick should call the onClickAddToProduct function with the product parameter', () => {
    const product: Products = {
      _id: '1',
      name: 'American Coffe',
      price: 5,
      image: new URL(
        'https://raw.githubusercontent.com/MariCornelio/burger-queen-server-mock/main/resources/images/american-coffee.png'
      ),
      type: 'breakfast',
      dateEntry: new Date(2023, 3, 4),
    };

    spyOn(orderSvc, 'onClickAddProduct').and.callThrough();
    component.onClick(product);
    expect(orderSvc.onClickAddProduct).toHaveBeenCalledWith(product);
  });
});
