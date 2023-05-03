import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { Products } from 'src/app/interfaces/products.interface';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/service/auth.service';
import { SharedAdminService } from 'src/app/service/shared-admin.service';
import { SharedOrderService } from 'src/app/service/shared-order.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  user!: User[];
  waiter!: User[];
  chef!: User[];
  admin!: User[];

  constructor(
    private toastr: ToastrService,
    private userSvc: AuthService,
    private sharedOrderSvc: SharedOrderService,
    private sharedAdminSvc: SharedAdminService,
  ) { }

  ngOnInit() {
    console.log('cargo el app-user');
    this.getDataUsers();
  }

  getDataUsers() {
    this.userSvc.getUsers().subscribe({
      next: (res) => {
        this.user = res;
        this.waiter = this.filterByRole('waiter');
        this.chef = this.filterByRole('chef');
        this.admin = this.filterByRole('admin');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Loading error users');
      },
    });
  }

  filterByRole(role: string): User[] {
    return this.user.filter((user) => user.role === role);
  }

  openUserModal() {
    this.sharedOrderSvc.$modalUser.emit(true);
    this.sharedAdminSvc.updateUser(false);
  }

  onClickUserEdit(user: User): void {
    this.sharedOrderSvc.$modalUser.emit(true);
    this.sharedAdminSvc.addUser(user);
    this.sharedAdminSvc.updateUser(true);
  }

  openModalDelete(user: User, value: string): void {
    this.sharedAdminSvc.$modalDelete.emit(true);
    this.sharedAdminSvc.addingUserToDelete(user, value);
  }

}
