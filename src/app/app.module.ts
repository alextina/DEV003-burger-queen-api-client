import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UpdatepopupComponent,
    KitchenComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
