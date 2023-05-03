import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../service/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

class AuthTestingService {
  methodLogin(email: string, password: string): Observable<any> {
    return of({
      accessToken: 'AleMari123456',
      user: {
        id: '1',
        role: 'admin',
      },
    });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let toastr: ToastrService;
  let service: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        ToastrService,
        { provide: AuthService, useClass: AuthTestingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(AuthService);
    toastr = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });
  it('Testing the onSubmit method for "admin" ', () => {
    component.loginForm.patchValue({
      email: 'admin@gmail.com',
      password: '123456',
    });
    spyOn(router, 'navigate');
    // console.log(component.loginForm.value);

    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('Testing the onSubmit method for "waiter" ', () => {
    component.loginForm.patchValue({
      email: 'waiter@gmail.com',
      password: '123456',
    });
    spyOn(service, 'methodLogin').and.callFake(() =>
      of({
        accessToken: 'AleMari123456',
        user: {
          id: '2',
          role: 'waiter',
        },
      })
    );
    spyOn(router, 'navigate');
    // console.log(component.loginForm.value);

    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['menu']);
  });

  it('Testing the onSubmit method for "chef" ', () => {
    component.loginForm.patchValue({
      email: 'chef@gmail.com',
      password: '123456',
    });
    spyOn(service, 'methodLogin').and.callFake(() =>
      of({
        accessToken: 'AleMari123456',
        user: {
          id: '3',
          role: 'chef',
        },
      })
    );
    spyOn(router, 'navigate');
    // console.log(component.loginForm.value);

    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['kitchen']);
  });
  it('Testing the onSubmit method for "" ', () => {
    component.loginForm.patchValue({
      email: 'unknown@gmail.com',
      password: '123456',
    });
    spyOn(service, 'methodLogin').and.callFake(() =>
      of({
        accessToken: 'AleMari123456',
        user: {
          id: '4',
          role: '',
        },
      })
    );
    spyOn(router, 'navigate');
    // console.log(component.loginForm.value);

    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('Should throw an error if methodLogin fails (status:400)', () => {
    spyOn(service, 'methodLogin').and.callFake(() =>
      throwError(() => {
        return {
          error: 'Error',
          status: 400,
        };
      })
    );
    spyOn(toastr, 'error').and.callThrough();
    component.onSubmit();
    expect(toastr.error).toHaveBeenCalledWith('Error', 'Invalid credentials');
  });
  it('Should throw an error if methodLogin fails (other case)', () => {
    spyOn(service, 'methodLogin').and.callFake(() =>
      throwError(() => {
        return {
          error: 'Error',
          status: 500,
        };
      })
    );
    spyOn(toastr, 'error').and.callThrough();
    component.onSubmit();
    expect(toastr.error).toHaveBeenCalledWith(
      'An unexpected error occurred',
      'Error'
    );
  });

  it('Testing the toglePassword method', () => {
    component.togglePassword();
    expect(component.hide).toBeFalsy();
  });
});
