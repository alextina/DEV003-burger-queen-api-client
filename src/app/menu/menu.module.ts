import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [MenuComponent, OrderComponent],
  imports: [CommonModule,MenuRoutingModule],
})
export class MenuModule {}
