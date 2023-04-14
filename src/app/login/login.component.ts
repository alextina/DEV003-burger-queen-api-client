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
  // declarando variables
  loginForm: FormGroup;
  // declarando-inicializando en  true = visibility_off
  hide: boolean = true;
  images = [
    '../../assets/burgers-login.jpg',
    '../../assets/burgers-login2.jpg',
  ];
  constructor(
    // pasando dependencias que usaremos en el componente
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    //Inicializando variable loginForm con el metodo "builder" de FormBuilder para capturar el email y el password del usuario con el método group
    this.loginForm = this.builder.group({
      // Inicializando atributo value ="" y asignando validaciones para cada input
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    // objeto formData con propiedades email y password
    const formData = this.loginForm.value;
    // console.log(this.loginForm.value);

    // accediendo al método "methodLogin" de la clase AuthService (app/service/auth.service.ts)donde accede a su método subscribe (El cual estará atento a cualquier emisión de datos que produzca ese servicio) que recide un objeto con los métodos next y error y se ejecutarán segun la respuesta del servidor
    this.service.methodLogin(formData.email, formData.password).subscribe({
      next: (res) => {
        // Creando la variable "token" en sessionStorage con el valor de la propiedad accessToken del objeto de respuesta
        console.log(res);
        sessionStorage.setItem('token', res.accessToken);
        sessionStorage.setItem('idUser', res.user.id);
        console.log(res.accessToken);
        // Ruteando al endpoint menu
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
  }
  // Funcionamiento del evento click para  ocultar y mostrar la contraseña  con visibility_off - visibility de Material Icons de Google
  togglePassword(): void {
    this.hide = !this.hide;
  }
}
// Nota:
// :void --> no tiene return
