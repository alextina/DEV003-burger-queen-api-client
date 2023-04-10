import { Component } from '@angular/core';
import { SharedOrderService } from 'src/app/service/shared-order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  constructor(private orderSvc: SharedOrderService) {}
  order$ = this.orderSvc.order$;
  total$ = this.orderSvc.total$;
}
