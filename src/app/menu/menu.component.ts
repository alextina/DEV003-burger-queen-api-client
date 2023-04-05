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

  constructor(
    private toastr: ToastrService,
    private service: ProductsService
  ) {}
  ngOnInit() {
    this.service.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error, 'Loading error');
      },
    });
  }
}
