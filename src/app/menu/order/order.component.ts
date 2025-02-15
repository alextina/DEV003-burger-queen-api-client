import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsQty } from 'src/app/interfaces/products.interface';
import { SharedOrderService } from 'src/app/service/shared-order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(
    private orderSvc: SharedOrderService,
    private toastr: ToastrService
  ) { }

  @Input() clientName!: string;
  @Input() clientTable!: number | null;
  @Output() resetNameTable = new EventEmitter<void>();

  productsOrder$ = this.orderSvc.productsOrder$;
  total$ = this.orderSvc.total$;
  order$ = this.orderSvc.order$;
  noProduct!: ProductsQty[];

  ngOnInit() {
    this.productsOrder$.subscribe((res) => (this.noProduct = res));
  }

  // para eliminar productos
  delete(id: string) {
    this.orderSvc.deleteProduct(id);
  }

  // para actualizar cantidad de productos
  update(operations: string, id: string) {
    this.orderSvc.qtyOperations(operations, id);
  }

  // para cerrar modal
  closeModal() {
    this.orderSvc.$modal.emit(false);
  }

  // enviar orden a carrito de compras
  sendOrder() {
    this.orderSvc.onClickAddOrder(this.clientName, this.clientTable);

    this.orderSvc.resetProductsOrder();
    this.closeModal();
    this.clientName = '';
    this.clientTable = null;
    // emitiendo evento para resetear nombre del cliente en menu
    this.resetNameTable.emit();
    this.toastr.info('Order sent.');
  }
}
