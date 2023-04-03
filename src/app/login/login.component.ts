import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(): void {
    const formData = this.loginForm.value;
    // console.log(this.loginForm.value);
    this.service.methodLogin(formData.email, formData.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.accessToken);
        console.log(res.accessToken);
        this.router.navigate(['menu']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 400) {
          this.toastr.error(error.error, 'Invalid credentials');
        } else {
          this.toastr.error('An unexpected error occurred', 'Error');
        }
      },
    });

    // this.toastr.error('Invalid credentials');
  }
  togglePassword(): void {
    this.hide = !this.hide;
  }

  // continueLogin() {
  //   if (this.loginform.valid) {
  //     this.service.GetByCode(this.loginform.value.username).subscribe((res) => {
  //       this.userdata = res;
  //       console.log(this.userdata);
  //       if (this.userdata.password === this.loginform.value.password) {
  //         if (this.userdata.isactive) {
  //           sessionStorage.setItem('username', this.userdata.id);
  //           sessionStorage.setItem('userrole', this.userdata.role);
  //           this.router.navigate(['menu']);
  //         } else {
  //           this.toastr.error('Please contact admin', 'Inactive user');
  //         }
  //       } else {
  //         this.toastr.error('Invalid credentials');
  //       }
  //     });
  //   }
  // }
}
