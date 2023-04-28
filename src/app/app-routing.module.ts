import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import {
  authGuardAdmin,
  authGuardLogin,
  authGuardMenu,
  authGuardKitchen
} from './guard/auth-fn.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [authGuardLogin],
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
    canActivate: [authGuardMenu],
  },
  {
    path: 'kitchen',
    component: KitchenComponent,
    canActivate: [authGuardKitchen],
  },
  {
    path: 'delivering',
    loadChildren: () => import('./delivering/delivering.module').then(m => m.DeliveringModule),
    canActivate: [authGuardMenu]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuardAdmin]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
