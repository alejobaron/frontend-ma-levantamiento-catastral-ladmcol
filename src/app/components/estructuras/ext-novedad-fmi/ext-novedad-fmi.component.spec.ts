import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtNovedadFMIComponent } from './ext-novedad-fmi.component';

describe('ExtNovedadFMIComponent', () => {
  let component: ExtNovedadFMIComponent;
  let fixture: ComponentFixture<ExtNovedadFMIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtNovedadFMIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtNovedadFMIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
