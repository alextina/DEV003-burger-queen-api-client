import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interfaces/products.interface';
import { ProductsService } from 'src/app/service/products.service';
import { SharedAdminService } from 'src/app/service/shared-admin.service';
import { SharedOrderService } from 'src/app/service/shared-order.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  product!: Products[];
  breakfast!: Products[];
  lunch!: Products[];

  constructor(
    private toastr: ToastrService,
    private productSvc: ProductsService,
    private sharedOrderSvc: SharedOrderService,
    private sharedAdminSvc: SharedAdminService
  ) {}

  ngOnInit() {
    this.productSvc.getProducts().subscribe({
      next: (res) => {
        this.product = res;
        this.breakfast = this.filterByType('breakfast');
        this.lunch = this.filterByType('lunch');
      },
      error: (err) => {
        this.toastr.error('Loading error products');
      },
    });
  }

  filterByType(type: string): Products[] {
    return this.product.filter((product) => product.type === type);
  }

  openProductModal() {
    this.sharedOrderSvc.$modalProduct.emit(true);
    this.sharedAdminSvc.updateProduct(false);
  }
  onClickProductEdit(product: Products): void {
    this.sharedOrderSvc.$modalProduct.emit(true);
    this.sharedAdminSvc.addToProduct(product);
    this.sharedAdminSvc.updateProduct(true);
  }
}
