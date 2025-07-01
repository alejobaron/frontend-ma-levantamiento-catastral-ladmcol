import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrAgrupacionInteresadosComponent } from './cr-agrupacion-interesados.component';

describe('CrAgrupacionInteresadosComponent', () => {
  let component: CrAgrupacionInteresadosComponent;
  let fixture: ComponentFixture<CrAgrupacionInteresadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrAgrupacionInteresadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrAgrupacionInteresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
