import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { ModalProductComponent } from './modal-product/modal-product.component';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    ProductsComponent,
    ModalUserComponent,
    ModalProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
