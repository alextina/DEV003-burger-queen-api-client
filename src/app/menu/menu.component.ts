import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';
import { Products } from '../interfaces/products.interface';
import { SharedOrderService } from '../service/shared-order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  products!: Products[];
  filteredProducts!: Products[];
  // creando variable para el modal
  modalSwitch!: boolean;

  constructor(
    private toastr: ToastrService,
    private service: ProductsService,
    private orderSvc: SharedOrderService
  ) { }

  //método que se carga al iniciar el componente
  ngOnInit() {

    // escuchando el objeto observable del modalSwitch
    this.orderSvc.$modal.subscribe((value) => {
      return this.modalSwitch = value
    })

    // usando método getproduct de la clase Productservice (app/service/ProductService.ts)
    this.service.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.filteredProducts = this.filterProductByType('breakfast');
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error, 'Loading error');
      },
    });
  }

  // método para filterar productos por tipo
  filterProductByType(type: string): Products[] {
    return this.products.filter((product) => {
      return product.type === type;
    });
  }

  // método para cambiar el tipo de producto y actualizar la vista
  changeProductType(type: string) {
    this.filteredProducts = this.filterProductByType(type);
  }

  // método onClick usando en el botón "Add" de cada producto el cual usa el método onClickAddOrder del servicio SharedOrderService :
  // onClickAddOrder(product: Products): void {
  //   this.addToOrder(product);
  //   this.totalCount();
  // }
  // este método agrega internamente productos al carrito de ordenes y calcula el total de la orden

  onClick(product: Products): void {
    this.orderSvc.onClickAddOrder(product);
    console.log('menu', product);
  }

  // método para abrir modal
  openModal() {
    this.modalSwitch = true;
  }

}
