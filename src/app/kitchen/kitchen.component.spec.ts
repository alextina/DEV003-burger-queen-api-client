import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { OrderService } from '../service/order.service';
import { Order } from '../interfaces/order.interface';

import { KitchenComponent } from './kitchen.component';
import { SharedModule } from '../shared/shared.module';
import { Observable, of, throwError } from 'rxjs';

class OrderTestingService {
    getOrder(): Observable<Order[]> {
        return of([
            {
                id: '1',
                userId: '1',
                client: 'MariAle',
                tableNum: 17,
                products: [{
                    qty: 1,
                    product: {
                        id: '3',
                        name: 'burger',
                        price: 3,
                        image: 'www.image.com',
                        type: 'lunch',
                        dateEntry: new Date(),
                    }
                }],
                status: 'pending',
                dataEntry: new Date(),
            }
        ])
    };

    patchOrder(id: string, status: string): Observable<Order> {
        return of(
            {
                id: '1',
                userId: '1',
                client: 'MariAle',
                tableNum: 17,
                products: [{
                    qty: 1,
                    product: {
                        id: '3',
                        name: 'burger',
                        price: 3,
                        image: 'www.image.com',
                        type: 'lunch',
                        dateEntry: new Date(),
                    }
                }],
                status: status,
                dataEntry: new Date(),
            }
        )
    }
}

describe('KitchenComponent', () => {
    let component: KitchenComponent;
    let fixture: ComponentFixture<KitchenComponent>;
    let orderSvc: OrderService;
    let toastr: ToastrService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToastrModule.forRoot(), SharedModule],
            declarations: [KitchenComponent],
            providers: [
                ToastrService,
                { provide: OrderService, useClass: OrderTestingService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(KitchenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        orderSvc = TestBed.inject(OrderService);
        toastr = TestBed.inject(ToastrService);

    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component).toBeDefined();
    });

    it('should throw an error if "getOrder" fails', () => {
        spyOn(orderSvc, 'getOrder').and.callFake(() => throwError(() => 'Error'));
        spyOn(toastr, 'error').and.callThrough();
        component.ngOnInit();
        expect(toastr.error).toHaveBeenCalledOnceWith('Loading error orders.')
    });

    it('OnClickDone should call patchOrder and change to "pending" the status of the order', () => {

        const order = {
            id: '1',
            userId: '1',
            client: 'MariAle',
            tableNum: 17,
            products: [{
                qty: 1,
                product: {
                    id: '3',
                    name: 'burger',
                    price: 3,
                    image: 'www.image.com',
                    type: 'lunch',
                    dateEntry: new Date(),
                }
            }],
            status: 'pending',
            dataEntry: new Date(),
        }

        const order2 = {
            id: '1',
            userId: '1',
            client: 'MariAle',
            tableNum: 17,
            products: [{
                qty: 1,
                product: {
                    id: '3',
                    name: 'burger',
                    price: 3,
                    image: 'www.image.com',
                    type: 'lunch',
                    dateEntry: new Date(),
                }
            }],
            status: 'delivering',
            dataEntry: new Date(),
        }

        component.OnClickDone(order);
        orderSvc.patchOrder('1', 'delivering').subscribe(res => {
            expect(res).toEqual(order2)
        })
    });

    it('should throw an error if "patchOrder" fails', () => {

        const order = {
            id: '1',
            userId: '1',
            client: 'MariAle',
            tableNum: 17,
            products: [{
                qty: 1,
                product: {
                    id: '3',
                    name: 'burger',
                    price: 3,
                    image: 'www.image.com',
                    type: 'lunch',
                    dateEntry: new Date(),
                }
            }],
            status: 'pending',
            dataEntry: new Date(),
        }

        spyOn(orderSvc, 'patchOrder').and.callFake(() => throwError(() => 'Error'));
        spyOn(toastr, 'error').and.callThrough();
        component.OnClickDone(order);
        expect(toastr.error).toHaveBeenCalledWith('Something went wrong.')

    });

});
