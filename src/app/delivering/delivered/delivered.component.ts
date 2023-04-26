import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-delivered',
  templateUrl: './delivered.component.html',
  styleUrls: ['./delivered.component.css']
})
export class DeliveredComponent {
  orders!: Order[];
  total!: number;

  constructor(
    private orderHttpSvc: OrderService,
    private toastr: ToastrService,
  ) { }

  getDelivered(): void {
    this.orderHttpSvc.getOrder('delivered').subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: () => {
        this.toastr.error('Loading error delivered orders.')
      },
    });
  }

  getTotal(order: Order): number {
    this.total = order.products.reduce((total, el) => (total += el.product.price * el.qty), 0)
    return this.total
  }

  ngOnInit(): void {
    this.getDelivered();
    setInterval(() => {
      this.getDelivered()
    }, 10000)
  }

  onClickCanceled(order: Order): void {
    const id = order.id || '';
    this.orderHttpSvc.patchOrder(id, 'canceled').subscribe({
      error: () => {
        this.toastr.error('Something went wrong')
      },
    });
    this.getDelivered();
  }

}
