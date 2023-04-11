import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [{ path: '', component: MenuComponent }];

@NgModule({
  // No se crea un nuevo servicio de rutas, solo carha cuando es llamado en el ruteado principal por lazy-load 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MenuRoutingModule { }
