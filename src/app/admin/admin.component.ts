import { Component } from '@angular/core';
import { SharedOrderService } from '../service/shared-order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  viewValue: string = 'users';
  userSwitch!: boolean;
  productSwitch!: boolean;

  constructor(
    private sharedOrderSvc: SharedOrderService,
  ) { }

  changeByAdmin(value: string) {
    this.viewValue = value;
  }

  ngOnInit() {
    this.sharedOrderSvc.$modalUser.subscribe((value) => {
      return (this.userSwitch = value);
    });

    this.sharedOrderSvc.$modalProduct.subscribe((value) => {
      return (this.productSwitch = value)
    })
  }

}
