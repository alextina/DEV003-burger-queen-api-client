import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { SharedAdminService } from 'src/app/service/shared-admin.service';
import { SharedOrderService } from 'src/app/service/shared-order.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
})
export class ModalUserComponent implements OnInit {
  modalUserForm: FormGroup;
  hide: boolean = true;
  nameWaiter!: string;
  valueUpdateUser!: boolean;

  // Inscribiendome al Subject
  user$ = this.shareAdminSvc.user$;
  updateUser$ = this.shareAdminSvc.updateUser$;

  togglePassword(): void {
    this.hide = !this.hide;
  }

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private userSvc: AuthService,
    private sharedOrderSvc: SharedOrderService,
    private shareAdminSvc: SharedAdminService
  ) {
    this.modalUserForm = this.builder.group({
      name: ['', [Validators.required]],
      role: ['role', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.user$.subscribe((res) => {
      const { email, name, role } = res;
      // console.log(password);
      this.modalUserForm.patchValue({ name, email, role });
    });
    this.updateUser$.subscribe((res) => {
      this.valueUpdateUser = res;
    });
  }

  closeUserModal() {
    this.shareAdminSvc.resetUser();
    this.sharedOrderSvc.$modalUser.emit(false);
  }

  sendUser(): void {
    const formData = this.modalUserForm.value;
    console.log(this.valueUpdateUser);
    if (this.valueUpdateUser) {
      console.log('nuevo');

      this.user$.subscribe((res) => {
        let { id } = res;
        if (id) {
          this.userSvc.putUser(id, formData).subscribe({
            next: (resp) => {
              this.closeUserModal();
              this.toastr.info('User successfully updated');
              console.log(resp);
              console.log(formData);
            },
            error: () => this.toastr.error('Error sending user'),
          });
        }
      });
    } else {
      console.log('nuevo');
      this.userSvc.postUser(formData).subscribe({
        next: () => {
          this.closeUserModal();
          this.toastr.info('New user successfully registered');
        },
        error: () => this.toastr.error('Error sending user'),
      });
    }
  }
}
