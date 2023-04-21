import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../service/order.service';
import { Order } from '../interfaces/order.interface';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
})
export class KitchenComponent implements OnInit {
  orders!: Order[];

  constructor(
    private orderHttpSvc: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.orderHttpSvc.getOrder('pending').subscribe({
      next: (res) => {
        this.orders = res;
        // filtrar pendientes
        // filtrar delivery (vista mesero)
        console.log(res);
      },
      error: () => {
        this.toastr.error('Loading error orders.');
      },
    });
  }

  OnClickDone(order: Order): void {
    const id = order.id || '';
    this.orderHttpSvc.patchOrder(id, 'delivering').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {
        this.toastr.error('Something went wrong.')
      },
    });
  }

}
