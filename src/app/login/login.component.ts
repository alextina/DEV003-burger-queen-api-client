import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router'
import { REMOVE_STYLES_ON_COMPONENT_DESTROY } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) { }

  userdata: any;

  loginform = this.builder.group({
    username: this.builder.control("", Validators.required),
    password: this.builder.control("", Validators.required),
  })

  continueLogin() {
    if (this.loginform.valid) {
      this.service
        .GetByCode(this.loginform.value.username)
        .subscribe((res) => {
          this.userdata = res;
          console.log(this.userdata);
          if (this.userdata.password === this.loginform.value.password) {
            if (this.userdata.isactive) {
              sessionStorage.setItem('username', this.userdata.id);
              sessionStorage.setItem('userrole', this.userdata.role);
              this.router.navigate(['menu'])
            } else {
              this.toastr.error('Please contact admin', 'Inactive user')
            }
          } else {
            this.toastr.error('Invalid credentials')
          }
        })
    }
  }
}
