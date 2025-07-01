import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeometriaComponent } from './geometria.component';

describe('GeometriaComponent', () => {
  let component: GeometriaComponent;
  let fixture: ComponentFixture<GeometriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeometriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeometriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
