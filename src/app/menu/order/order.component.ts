import { Component } from '@angular/core';
import { ProductsQty } from 'src/app/interfaces/products.interface';
import { SharedOrderService } from 'src/app/service/shared-order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  constructor(private orderSvc: SharedOrderService) { }
  order$ = this.orderSvc.order$;
  total$ = this.orderSvc.total$;

  delete(id: string) {
    this.orderSvc.deleteProduct(id);
  }

  update(operations: string, id: string) {
    this.orderSvc.qtyOperations(operations, id)
    // const product: ProductsQty | undefined = this.orderSvc.findProductById(id);
    // if (product) {
    //   if (operations === 'minus' && product.qty > 0) {
    //     product.qty = product.qty - 1;
    //   }
    //   if (operations === 'add') {
    //     product.qty = product.qty + 1;
    //   }
    //   if (product.qty === 0) {
    //     // this.orderSvc.deleteProduct(id);
    //     this.delete(id);
    //   }
    // }
  }

  // para cerrar modal
  closeModal() {
    this.orderSvc.$modal.emit(false)
  }
}
