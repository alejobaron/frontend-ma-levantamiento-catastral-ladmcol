import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasUnidadConstruccionComponent } from './caracteristicas-unidad-construccion.component';

describe('CaracteristicasUnidadConstruccionComponent', () => {
  let component: CaracteristicasUnidadConstruccionComponent;
  let fixture: ComponentFixture<CaracteristicasUnidadConstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaracteristicasUnidadConstruccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaracteristicasUnidadConstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
