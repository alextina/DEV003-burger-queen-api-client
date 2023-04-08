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
}
