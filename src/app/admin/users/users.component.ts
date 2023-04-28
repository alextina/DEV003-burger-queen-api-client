import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/service/auth.service';
import { SharedOrderService } from 'src/app/service/shared-order.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
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
  ) { }

  ngOnInit() {
    this.userSvc.getUsers().subscribe({
      next: (res) => {
        this.user = res;
        this.waiter = this.filterByRole('waiter');
        this.chef = this.filterByRole('chef');
        this.admin = this.filterByRole('admin')
      },
      error: () => {
        this.toastr.error('Loading error users')
      }
    })
  }

  filterByRole(role: string): User[] {
    return this.user.filter((user) => user.role === role)
  }

  openUserModal() {
    this.sharedOrderSvc.$modalUser.emit(true)
  }

}
