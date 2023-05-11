import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { SharedOrderService } from 'src/app/service/shared-order.service';
import { EventEmitter } from '@angular/core';
import { SharedModule } from '../shared.module';

class SharedOrderTestingService {
    $modal = new EventEmitter<any>();
}

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let sharedOrderSvc: SharedOrderService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [HeaderComponent],
            providers: [
                { provide: SharedOrderService, useClass: SharedOrderTestingService },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        sharedOrderSvc = TestBed.inject(SharedOrderService);

    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component).toBeDefined();
    });

    it('openModal() should emit true.', () => {
        // sharedOrderSvc.$modal.emit(true);
        spyOn(sharedOrderSvc.$modal, 'emit').and.callThrough();
        component.openModal();
        expect(sharedOrderSvc.$modal.emit).toHaveBeenCalledWith(true);
    });

});
