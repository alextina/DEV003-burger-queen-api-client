import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';
import { Products } from '../interfaces/products.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  products!: Products[];
  filteredProducts!: Products[];

  constructor(
    private toastr: ToastrService,
    private service: ProductsService
  ) { }

  ngOnInit() {
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
    })
  }

  // método para cambiar el tipo de producto y actualizar la vista
  changeProductType(type: string) {
    this.filteredProducts = this.filterProductByType(type);
  }

}
