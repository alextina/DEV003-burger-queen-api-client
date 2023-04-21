import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveringComponent } from './delivering.component';

const routes: Routes = [{ path: '', component: DeliveringComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveringRoutingModule { }
