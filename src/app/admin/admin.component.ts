import { Component } from '@angular/core';
import { SharedOrderService } from '../service/shared-order.service';
import { User } from '../interfaces/users.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  viewValue: string = 'users';
  userSwitch!: boolean;
  productSwitch!: boolean;
  awaitComponent!: boolean;

  constructor(private sharedOrderSvc: SharedOrderService) {}

  ngOnInit() {
    this.sharedOrderSvc.$modalUser.subscribe((value) => {
      return (this.userSwitch = value);
    });

    this.sharedOrderSvc.$modalProduct.subscribe((value) => {
      return (this.productSwitch = value);
    });
  }

  changeByAdmin(value: string) {
    this.viewValue = value;
  }

  // loading(value: boolean) {
  //   console.log(value);
  //   this.usersLoaded = value;
  // }
}
