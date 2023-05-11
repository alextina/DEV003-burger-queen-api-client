// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AdminComponent } from './admin.component';
// import { ToastrService, ToastrModule } from 'ngx-toastr';
// import { SharedOrderService } from '../service/shared-order.service';
// import { SharedAdminService } from '../service/shared-admin.service';
// import { EventEmitter } from '@angular/core';
// import { SharedModule } from '../shared/shared.module';
// // import { AuthService } from '../service/auth.service';
// // import { ProductsService } from '../service/products.service';
// import { Observable, of, throwError } from 'rxjs';
// import { User } from '../interfaces/users.interface';

// // class AuthTestingService {
// //     postUser(user: User): Observable<any> {
// //         return of({
// //             accessToken: 'AleMari123456',
// //             user: {
// //                 id: '1',
// //                 role: 'admin',
// //             },
// //         })
// //     }
// // }

// class SharedOrderTestingService {
//     $modalUser = new EventEmitter<any>();
//     $modalProduct = new EventEmitter<any>();
// }

// class SharedAdminTestingService {
//     $modalDelete = new EventEmitter<any>();
// }

// describe('AdminComponent', () => {
//     let component: AdminComponent;
//     let fixture: ComponentFixture<AdminComponent>;
//     let sharedOrderSvc: SharedOrderService;
//     let sharedAdminSvc: SharedAdminService;
//     let toastr: ToastrService;
//     // let authService: AuthService;

//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             imports: [ToastrModule.forRoot(), SharedModule],
//             declarations: [AdminComponent],
//             providers: [
//                 ToastrService,
//                 { provide: SharedOrderService, useClass: SharedOrderTestingService },
//                 { provide: SharedAdminService, useClass: SharedAdminTestingService },
//                 // { provide: AuthService, useClass: AuthTestingService }
//             ],
//         }).compileComponents();

//         // creando componente
//         fixture = TestBed.createComponent(AdminComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();

//         // inyectando dependencias ya que son privadas
//         sharedOrderSvc = TestBed.inject(SharedOrderService);
//         sharedAdminSvc = TestBed.inject(SharedAdminService);
//         // authService = TestBed.inject(AuthService)
//         toastr = TestBed.inject(ToastrService);
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//         expect(component).toBeDefined();
//     })

// })