import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedOrderService } from 'src/app/service/shared-order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private orderSvc: SharedOrderService,
    private router: Router
  ) { }

  qty$ = this.orderSvc.qty$;
  role = sessionStorage.getItem('role');
  path = location.pathname;

  // método para abrir modal
  openModal() {
    this.orderSvc.$modal.emit(true)
  }

  goToDelivering(): void {
    this.router.navigate(['delivering']);
  }

  goToMenu(): void {
    this.router.navigate(['menu'])
  }

  goToAdmin(): void {
    this.router.navigate(['admin'])
  }

}
