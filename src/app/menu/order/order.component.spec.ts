import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedOrderService } from 'src/app/service/shared-order.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ProductsQty } from 'src/app/interfaces/products.interface';
import { EventEmitter } from '@angular/core';

class SharedOrderTestingService {
  order: ProductsQty[] = [
    {
      product: {
        id: '1',
        name: 'American Coffe',
        price: 5,
        image:
          'https://raw.githubusercontent.com/MariCornelio/burger-queen-server-mock/main/resources/images/american-coffee.png',
        type: 'breakfast',
        dateEntry: new Date(),
      },
      qty: 1,
    },
    {
      product: {
        id: '3',
        name: 'Ham and Cheese sandwish',
        price: 10,
        image:
          'https://raw.githubusercontent.com/MariCornelio/burger-queen-server-mock/main/resources/images/ham-and-cheese-sandwish.png',
        type: 'breakfast',
        dateEntry: new Date(),
      },
      qty: 1,
    },
  ];

  $modal = new EventEmitter<any>();

  productsOrderSubject = new BehaviorSubject<ProductsQty[]>(this.order);

  get productsOrder$(): Observable<ProductsQty[]> {
    return this.productsOrderSubject.asObservable();
  }

  deleteProduct(id: string): void {
    of([]);
  }
  qtyOperations(operations: string, id: string) {
    of([]);
  }
  onClickAddOrder(client: string, tableNum: number | null) {
    of([]);
  }
  resetProductsOrder() {
    of([]);
  }
}

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let orderSvc: SharedOrderService;
  let toastr: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      declarations: [OrderComponent],
      providers: [
        ToastrService,
        { provide: SharedOrderService, useClass: SharedOrderTestingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    orderSvc = TestBed.inject(SharedOrderService);
    toastr = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it('the "id" must be passed as a parameter in the delete() method', () => {
    spyOn(orderSvc, 'deleteProduct').and.callThrough();
    component.delete('1');
    expect(orderSvc.deleteProduct).toHaveBeenCalledWith('1');
  });
  it('the "operations" and "id" must be passed as a parameter in the qtyOperations method', () => {
    spyOn(orderSvc, 'qtyOperations').and.callThrough();
    component.update('minus', '1');
    expect(orderSvc.qtyOperations).toHaveBeenCalledWith('minus', '1');
  });

  it('It should output false in the $modal.', () => {
    spyOn(orderSvc.$modal, 'emit').and.callThrough();
    component.closeModal();
    expect(orderSvc.$modal.emit).toHaveBeenCalledWith(false);
  });

  it('functionality of sendOrder()', () => {
    component.clientName = 'Ale';
    component.clientTable = 15;
    spyOn(orderSvc, 'onClickAddOrder').and.callThrough();
    spyOn(toastr, 'info').and.callThrough();

    component.sendOrder();

    expect(orderSvc.onClickAddOrder).toHaveBeenCalledWith('Ale', 15);

    expect(component.clientName).toBe('');
    expect(component.clientTable).toBeNull();
    expect(toastr.info).toHaveBeenCalledWith('Order sent.');
  });
});
