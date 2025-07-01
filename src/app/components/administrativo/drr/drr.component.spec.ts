import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DRRComponent } from './drr.component';

describe('DRRComponent', () => {
  let component: DRRComponent;
  let fixture: ComponentFixture<DRRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DRRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DRRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
