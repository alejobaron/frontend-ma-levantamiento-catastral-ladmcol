import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumenValorComponent } from './volumen-valor.component';

describe('VolumenValorComponent', () => {
  let component: VolumenValorComponent;
  let fixture: ComponentFixture<VolumenValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumenValorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumenValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
