import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { SharedOrderService } from 'src/app/service/shared-order.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent {
  modalUserForm: FormGroup;
  hide: boolean = true;

  togglePassword(): void {
    this.hide = !this.hide;
  }

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private userSvc: AuthService,
    private sharedOrderSvc: SharedOrderService,
  ) {

    this.modalUserForm = this.builder.group({
      name: ['', [Validators.required]],
      role: ['role', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  sendUser(): void {
    const formData = this.modalUserForm.value;
    this.userSvc.postUser(formData).subscribe({
      next: (res) => console.log(res, 'cerrar modal'),
      error: () => this.toastr.error('Error sending user')
    })
  }

  closeUserModal() {
    this.sharedOrderSvc.$modalUser.emit(false);
  }

}
