import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [LogoutButtonComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [LogoutButtonComponent, HeaderComponent],
})
export class SharedModule { }
