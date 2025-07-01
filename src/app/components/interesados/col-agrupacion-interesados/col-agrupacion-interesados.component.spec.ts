import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColAgrupacionInteresadosComponent } from './col-agrupacion-interesados.component';

describe('ColAgrupacionInteresadosComponent', () => {
  let component: ColAgrupacionInteresadosComponent;
  let fixture: ComponentFixture<ColAgrupacionInteresadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColAgrupacionInteresadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColAgrupacionInteresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
