import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveringRoutingModule } from './delivering-routing.module';
import { DeliveringComponent } from './delivering.component';
import { DeliveredComponent } from './delivered/delivered.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DeliveringComponent,
    DeliveredComponent
  ],
  imports: [
    CommonModule,
    DeliveringRoutingModule,
    SharedModule
  ]
})
export class DeliveringModule { }
