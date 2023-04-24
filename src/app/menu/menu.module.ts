import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  // asociando componentes al módulo
  declarations: [MenuComponent, OrderComponent],
  // Asociando Modulos externos
  imports: [CommonModule, MenuRoutingModule, FormsModule, SharedModule],
})
export class MenuModule {}
