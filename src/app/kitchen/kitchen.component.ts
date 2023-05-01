import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../service/order.service';
import { Order } from '../interfaces/order.interface';
import { filter } from 'rxjs';

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
  ) {}

  getPending(): void {
    this.orderHttpSvc.getOrder('pending').subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: () => {
        this.toastr.error('Loading error orders.');
      },
    });
  }

  ngOnInit(): void {
    this.getPending();
    setInterval(() => {
      this.getPending();
    }, 10000);
  }

  OnClickDone(order: Order): void {
    const id = order.id || '';
    this.orderHttpSvc.patchOrder(id, 'delivering').subscribe({
      error: () => {
        this.toastr.error('Something went wrong.');
      },
    });
    this.getPending();
  }
}
