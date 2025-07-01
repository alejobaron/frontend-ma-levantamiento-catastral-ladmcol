import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColUnidadEspacialComponent } from './col-unidad-espacial.component';

describe('ColUnidadEspacialComponent', () => {
  let component: ColUnidadEspacialComponent;
  let fixture: ComponentFixture<ColUnidadEspacialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColUnidadEspacialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColUnidadEspacialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
