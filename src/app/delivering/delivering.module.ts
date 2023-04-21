import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveringRoutingModule } from './delivering-routing.module';
import { DeliveringComponent } from './delivering.component';
import { DeliveredComponent } from './delivered/delivered.component';


@NgModule({
  declarations: [
    DeliveringComponent,
    DeliveredComponent
  ],
  imports: [
    CommonModule,
    DeliveringRoutingModule
  ]
})
export class DeliveringModule { }
