import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/service/products.service';
import { SharedAdminService } from 'src/app/service/shared-admin.service';
import { SharedOrderService } from 'src/app/service/shared-order.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css'],
})
export class ModalProductComponent {
  modalProductForm: FormGroup;
  valueUpadteProduct!: boolean;

  // Inscribiendo al subject
  product$ = this.sharedAdminSvc.product$;
  updateProduct$ = this.sharedAdminSvc.updateProduct$;

  constructor(
    private builder: FormBuilder,
    private productSvc: ProductsService,
    private sharedOrderSvc: SharedOrderService,
    private sharedAdminSvc: SharedAdminService,
    private toastr: ToastrService
  ) {
    this.modalProductForm = this.builder.group({
      name: ['', [Validators.required]],
      type: ['type', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      image: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.product$.subscribe((res) => {
      const { name, price, image, type } = res;
      this.modalProductForm.patchValue({ name, price, image, type });
    });

    this.updateProduct$.subscribe((res) => {
      this.valueUpadteProduct = res;
    });
  }
  closeProductModal() {
    this.sharedAdminSvc.resetProduct();
    this.sharedOrderSvc.$modalProduct.emit(false);
  }
  sendProduct(): void {
    const formData = this.modalProductForm.value;
    if (this.valueUpadteProduct) {
      this.product$.subscribe((res) => {
        let { id } = res;
        if (id) {
          this.productSvc.putProduct(id, formData).subscribe({
            next: (resp) => {
              this.closeProductModal();
              this.toastr.info('Product successfully updated');
            },
            error: () => this.toastr.error('Error sending product'),
          });
        }
      });
    } else {
      this.productSvc
        .postProduct({ ...formData, dateEntry: new Date() })
        .subscribe({
          next: (res) => {
            this.closeProductModal();
            this.toastr.info('New product successfully registered');
          },
          error: () => this.toastr.error('Error sending product'),
        });
    }
  }
}
