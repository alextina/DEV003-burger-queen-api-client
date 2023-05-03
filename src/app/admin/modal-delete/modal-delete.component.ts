import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ProductsService } from 'src/app/service/products.service';
import { SharedAdminService } from 'src/app/service/shared-admin.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {

  constructor(
    private sharedAdminSvc: SharedAdminService,
    private authSvc: AuthService,
    private productSvc: ProductsService,
    private toastr: ToastrService,
  ) { }

  modalDelete$ = this.sharedAdminSvc.modalDelete$;
  dataToDelete: any;

  closeModalDelete(): void {
    this.sharedAdminSvc.$modalDelete.emit(false);
    this.sharedAdminSvc.resetModalDelete();
  }

  confirmDelete(): void {
    this.modalDelete$.subscribe((res) => {
      this.dataToDelete = res;
      if (this.dataToDelete.data === 'user') {
        this.authSvc.deleteUser(this.dataToDelete.id).subscribe({
          next: () => {
            this.toastr.info(`${this.dataToDelete.name} was deleted.`);
            this.closeModalDelete();
          },
          error: () => {
            this.toastr.error('Errors when trying to delete the user.')
          }
        });
      };
      if (this.dataToDelete.data === 'product') {
        this.productSvc.deleteProduct(this.dataToDelete.id).subscribe({
          next: () => {
            this.toastr.info(`${this.dataToDelete.name} was deleted.`);
            this.closeModalDelete();
          },
          error: () => {
            this.toastr.error('Errors when trying to delete the product.')
          }
        });
      };
    });
  }

}