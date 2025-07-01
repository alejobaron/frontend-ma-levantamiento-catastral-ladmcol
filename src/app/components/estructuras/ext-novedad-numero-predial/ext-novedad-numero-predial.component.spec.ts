import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtNovedadNumeroPredialComponent } from './ext-novedad-numero-predial.component';

describe('ExtNovedadNumeroPredialComponent', () => {
  let component: ExtNovedadNumeroPredialComponent;
  let fixture: ComponentFixture<ExtNovedadNumeroPredialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtNovedadNumeroPredialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtNovedadNumeroPredialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
