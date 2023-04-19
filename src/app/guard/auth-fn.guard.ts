import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

export const authGuardLogin: CanActivateFn = (): boolean => {
  const role = sessionStorage.getItem('role');
  const router: Router = inject(Router);

  if (role === 'admin') {
    router.navigate(['admin']);
  } else if (role === 'waiter') {
    router.navigate(['menu']);
  }

  return true;
};

export const authGuardMenu: CanActivateFn = (): boolean => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const router: Router = inject(Router);
  const toastr: ToastrService = inject(ToastrService);

  if (!token) {
    router.navigate(['']);
  } else if (role === 'admin' || role === 'waiter') {
    return true;
  }
  router.navigate(['']);
  toastr.info('Permission denied, contact admin.');
  return false;
};

export const authGuardAdmin: CanActivateFn = (): boolean => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const router: Router = inject(Router);
  const toastr: ToastrService = inject(ToastrService);

  if (!token) {
    router.navigate(['']);
  } else if (role === 'admin') {
    return true;
  }
  router.navigate(['']);
  toastr.info('Permission denied, contact admin.');
  return false;
};

export const authGuardKitchen: CanActivateFn = (): boolean => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const router: Router = inject(Router);
  const toastr: ToastrService = inject(ToastrService);

  if (!token) {
    router.navigate(['']);
  } else if (role === 'chef' || role === 'admin') {
    return true;
  }
  router.navigate(['']);
  toastr.info('Permission denied, contact admin.');
  return false;
}
