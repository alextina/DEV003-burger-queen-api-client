import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    // Esta propiedad trae la instancia del componente que se ha creado
    app = fixture.componentInstance;
    // se usa cuando hay cambios que afecta a la vista del html
    fixture.detectChanges();
  });
  it('should create the app', () => {
    expect(app).toBeTruthy();
    expect(app).toBeDefined();
  });

  it(`should have as title 'DEV003-burger-queen-api-client'`, () => {
    expect(app.title).toEqual('DEV003-burger-queen-api-client');
  });

  it('should render router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('router-outlet')?.innerHTML).toBe('');
  });
});
