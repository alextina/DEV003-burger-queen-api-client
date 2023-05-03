import { Component } from '@angular/core';
import { SharedOrderService } from '../service/shared-order.service';
import { User } from '../interfaces/users.interface';
import { SharedAdminService } from '../service/shared-admin.service';

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
  deleteSwitch!: boolean;
  activeButtonUser: boolean = true;
  activeButtonProduct: boolean = false;

  constructor(
    private sharedOrderSvc: SharedOrderService,
    private sharedAdminSvc: SharedAdminService,
  ) { }

  ngOnInit() {
    this.sharedOrderSvc.$modalUser.subscribe((value) => {
      return (this.userSwitch = value);
    });

    this.sharedOrderSvc.$modalProduct.subscribe((value) => {
      return (this.productSwitch = value);
    });

    this.sharedAdminSvc.$modalDelete.subscribe((value) => {
      return (this.deleteSwitch = value)
    })
  }

  changeByAdmin(value: string) {
    this.viewValue = value;
    if (value === 'users') {
      this.activeButtonUser = true;
      this.activeButtonProduct = false;
    };
    if (value === 'products') {
      this.activeButtonUser = false;
      this.activeButtonProduct = true;
    };
  }

}
