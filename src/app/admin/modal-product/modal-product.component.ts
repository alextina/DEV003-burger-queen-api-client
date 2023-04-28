import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';
import { SharedOrderService } from 'src/app/service/shared-order.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent {
  modalProductForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private productSvc: ProductsService,
    private sharedOrderSvc: SharedOrderService,
  ) {

    this.modalProductForm = this.builder.group({
      name: ['', [Validators.required]],
      type: ['type', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      image: ['', [Validators.required]]
    });

  }

  sendProduct(): void {
    const formData = this.modalProductForm.value;
    this.productSvc.postProduct({ ...formData, dateEntry: new Date() }).subscribe({
      next: res => console.log(res, 'cerrar modal'),
      error: (err) =>
        console.log(err)// this.toastr.error('Error sending product')

    })
  }

  closeProductModal() {
    this.sharedOrderSvc.$modalProduct.emit(false)
  }

}
