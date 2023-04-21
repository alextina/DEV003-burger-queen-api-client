import { Component } from '@angular/core';
import { OrderService } from '../service/order.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../interfaces/order.interface';

@Component({
  selector: 'app-delivering',
  templateUrl: './delivering.component.html',
  styleUrls: ['./delivering.component.css']
})
export class DeliveringComponent {
  orders!: Order[];

  constructor(
    private orderHttpSvc: OrderService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.orderHttpSvc.getOrder('delivering').subscribe({
      next: (res) => {
        this.orders = res;
        console.log(res);
      },
      error: () => {
        this.toastr.error('Loading error delivering orders.')
      },
    });
  }

  OnClickDelivered(order: Order): void {
    const id = order.id || '';
    this.orderHttpSvc.patchOrder(id, 'delivered').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {
        this.toastr.error('Something went wrong.')
      },
    });
  }

}
